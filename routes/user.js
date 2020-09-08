const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const parse = require("../lib/parse");
const mysql = require("mysql");
require('dotenv').config();

let userRoutes = Object.create({});

const options = {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "imagerepo",
  };

var connection = mysql.createConnection(options);

userRoutes.userinfo = function (req, res) {
  if (!req.headers.cookie) return res.status(500).send("not logged in");
  jwt.verify(parse.jwt(req), "9thyps29sxb", (err, decoded) => {
    if (!err) {
      connection.query(
        `select money from users where username = '${decoded.username}';`,
        function (err, results) {
          if (!err) {
            res.status(200).send({
              username: decoded.username,
              money: results[0].money,
            });
          }
        }
      );
    }
    console.log(err);
  });
};

userRoutes.login = async function (req, res) {
  const finishedBuffer = await parse.reqbody(req);
  connection.query(
    `select * from users where username = '${finishedBuffer.username}'`,
    function (err, results) {
      if(err){
	return res.status(500).send('MySQL error');
      }
      if (results.length != 0) {
        bcrypt.compare(finishedBuffer.password, results[0].password, function (
          err,
          result
        ) {
          if (result) {
            jwt.sign(
              { username: finishedBuffer.username },
              "9thyps29sxb",
              (err, token) => {
                res.cookie("auth", token);
                res
                  .status(200)
                  .send({
                    username: results[0].username,
                    money: results[0].money,
                  });
              }
            );
          } else {
            res.status(500).send("incorrect credentials");
          }
        });
        return;
      }
      res.status(500).send("user not found");
    }
  );
};

userRoutes.register = async function (req, res) {
  const finishedBuffer = parse.reqbody(req);
  connection.query(
    `select * from users where username = '${finishedBuffer.username}'`,
    function (err, results) {
      console.log(err);
      if (results.length === 0) {
        bcrypt.hash(finishedBuffer.password, 10, function (err, hash) {
          connection.query(
            `insert into users(username, password) values ('${finishedBuffer.username}', '${hash}')`,
            function (err, results) {
              console.log(err);
              jwt.sign(
                { username: finishedBuffer.username },
                "9thyps29sxb",
                (err, token) => {
                  connection.query(
                    `select * from users where username = '${finishedBuffer.username}'`,
                    function (err, results) {
                      res.cookie("auth", token);
                      res
                        .status(200)
                        .send({
                          username: results[0].username,
                          money: results[0].money,
                        });
                    }
                  );
                }
              );
            }
          );
        });
      } else {
        res.status(500).send("exists");
      }
    }
  );
};
module.exports = userRoutes;

const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const fs = require("fs");
const imageRoutes = Object.create({});
const parse = require("../lib/parse");
const path = require('path');
require('dotenv').config();

const options = {
  host: "localhost",
  user: process.env.DB_USER.toString(),
  password: process.env.DB_PASS.toString(),
  database: "imagerepo",
};

var connection = mysql.createConnection(options);

imageRoutes.imagelist = function (req, res) {
  if (!req.headers.cookie) return res.status(500).send("not logged in");
  jwt.verify(parse.jwt(req), "9thyps29sxb", (err, decoded) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        `select imageDetails.id, imageDetails.price, imageDetails.path, imageDetails.owner, imageDetails.public, users.username from imageDetails join users on imageDetails.owner = users.id where public = true;`,
        function (err, results) {
          let paths = [];
          for (i = 0; i < results.length; i++) {
            let tempobj = {
              pictureID: results[i].id,
              path: results[i].path,
              ownerID: results[i].owner,
              ownerUsername: results[i].username,
              price: results[i].price,
            };
            if (results[i].username == decoded.username) {
              tempobj.isOwner = true;
            }
            paths.push(tempobj);
          }
          res.status(200).send(paths);
        }
      );
    }
  });
};

imageRoutes.userimages = function (req, res) {
  jwt.verify(parse.jwt(req), "9thyps29sxb", (err, decoded) => {
    if (!err) {
      connection.query(
        `select imageDetails.id, imageDetails.price, imageDetails.path, imageDetails.owner, imageDetails.public, users.username from imageDetails join users on imageDetails.owner = users.id where users.username = '${decoded.username}'`,
        function (err, results) {
            console.log(err);
            console.log(results);
          let paths = [];
          for (i = 0; i < results.length; i++) {
            let tempobj = {
              pictureID: results[i].id,
              path: results[i].path,
              ownerID: results[i].owner,
              ownerUsername: results[i].username,
              price: results[i].price,
              public: results[i].public,
            };
            paths.push(tempobj);
          }
          res.status(200).send(paths);
        }
      );
    }
  });
};

imageRoutes.editimg = async function (req, res) {
  let reqBody = await parse.reqbody(req);
  jwt.verify(parse.jwt(req), "9thyps29sxb", (err, decoded) => {
    if (!err) {
      connection.query(
        `update imageDetails set price = ${reqBody.price}, public = ${reqBody.public} where id = ${reqBody.id}`,
        function (err, results) {
          console.log(err);
          if (!err) {
            res.sendStatus(200);
          }
        }
      );
    }
  });
};

imageRoutes.deleteimg = async function (req, res) {
  let reqBody = await parse.reqbody(req);
  jwt.verify(parse.jwt(req), "9thyps29sxb", (err, decoded) => {
    if (!err) {
      connection.query(
        `delete from imageDetails where id = ${reqBody.pictureID}`,
        function (err, results) {
          console.log(err);
          if (!err) {
            res.sendStatus(200);
          }
        }
      );
    }
  });
};

imageRoutes.purchasereq = async function (req, res) {
  let bodyOfReq = await parse.reqbody(req);
  let userAmountAfterPurchase = 0;
  jwt.verify(parse.jwt(req), "9thyps29sxb", (err, decoded) => {
    if (err) {
      res.status(500).send("authorization error");
      return;
    } else {
      connection.query(
        `select money, price from users join imageDetails on users.username = '${decoded.username}' and imageDetails.id = ${bodyOfReq.pictureID};`,
        function (err, results) {
          if (results[0].money < results[0].price) {
            res.status(500).send("not enough money");
            return;
          } else {
            userAmountAfterPurchase = results[0].money - results[0].price;

            connection.query(
              `update users set money = money + ${results[0].price} where id = (select * from (select owner from imageDetails join users on imageDetails.owner = users.id where imageDetails.id = ${bodyOfReq.pictureID}) as x);`,
              (err, results) => {
                if (!err) {
                  connection.query(
                    `update imageDetails set owner = (select id from users where username = '${decoded.username}') where imageDetails.id = ${bodyOfReq.pictureID};`,
                    (err, results) => {
                      console.log(err);
                      connection.query(
                        `update users set money = ${userAmountAfterPurchase} where username = '${decoded.username}';`,
                        (err, results) => {
                          console.log("set money");
                          res.sendStatus(200);
                        }
                      );
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
};

imageRoutes.image = function (req, res) {
  fs.readdir(path.join(__dirname, '..', '/imgs'), (err, files) => {
    for (i = 0; i < files.length; i++) {
      if (files[i].includes(req.params.imagename)) {
        res.sendFile(path.join(__dirname, '..', `/imgs/${files[i]}`));
        return;
      }
    }
    res.status(500).send("not found");
  });
};

imageRoutes.uploadimg = function (req, res) {
  jwt.verify(parse.jwt(req), "9thyps29sxb", (err, decoded) => {
    if (err) {
      res.status(500).send("auth issue");
      return;
    } else {
      let stringifiedObj = JSON.parse(JSON.stringify(req.body));
      function queryDB(i, fileDetails) {
        return new Promise((resolve, reject) => {
          connection.query(
            `call add_image('${req.files[i].fieldname}', (select id from users where username = '${decoded.username}'), ${fileDetails[0]}, ${fileDetails[1]}, '${fileDetails[2]}');`,
            function (err, results) {
              if (err) {
                console.log(err);
                reject();
              } else {
                console.log(results);
                resolve();
              }
            }
          );
        });
      }
      (async function runQuery() {
      for (i = 0; i < req.files.length; i++) {
        let fileDetails = JSON.parse(stringifiedObj[req.files[i].fieldname]);
          await queryDB(i, fileDetails);
      }
      })();
      res.status(200).send("done");
    }
  });
};

module.exports = imageRoutes;

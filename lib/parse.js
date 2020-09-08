const parse = Object.create(null);

parse.jwt = function (req) {
  return req.headers.cookie.substring(req.headers.cookie.indexOf("=") + 1);
};

parse.reqbody = function (req) {
  return new Promise((resolve, reject) => {
    let finishedBuffer = "";
    req.on("data", (chunk) => {
      finishedBuffer += chunk;
    });

    req.on("end", () => {
      resolve(JSON.parse(finishedBuffer));
    });
  });
};

module.exports = parse;

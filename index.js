const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");

const imageRoutes = require("./routes/image");
const userRoutes = require("./routes/user");

var storage = multer.diskStorage({
  destination: __dirname + "/imgs",
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.random() * 1e9;
    let mimeType = file.mimetype.split("/");
    cb(null, file.fieldname + `.${mimeType[mimeType.length - 1]}`);
  },
});

const upload = multer({ storage: storage });

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/imagelist", imageRoutes.imagelist);

app.get("/userimages", imageRoutes.userimages);

app.post("/editimg", imageRoutes.editimg);

app.post("/deleteimg", imageRoutes.deleteimg);

app.get("/userinfo", userRoutes.userinfo);

app.post("/purchasereq", imageRoutes.purchasereq);

app.get("/images/:imagename", imageRoutes.image);

app.post("/uploadimg", upload.any(), imageRoutes.uploadimg);

app.post("/login", userRoutes.login);

app.post("/register", userRoutes.register);

app.listen(8000, () => {
  console.log("running");
});

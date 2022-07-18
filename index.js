const express = require("express");
const app = express();
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();

const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const CategoryRoute = require("./routes/categories");

app.use(express.json()); // this is like body parser, like we can get the req by just req.body

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to the mongo server");
  })
  .catch((err) => console.log(err.message));

// using multer for storing files.

const storage = multer.diskStorage({
  // this function is like storing the files.
  destination: (req, file, cb) => {
    //decides where will the file go.
    // it will take 3 params, req, file(the uploaded file), and a callback to handle err
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage }); // function to upload files.
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has uploaded");
});

app.use("/api/auth", authRoute); // request of /api/ is sent to the register Route.
app.use("/api/user", userRoute); // request of /api/ is sent to the register Route.
app.use("/api/post", postRoute); // request of /api/ is sent to the register Route.
app.use("/api/category", CategoryRoute); // request of /api/ is sent to the register Route.

app.listen("5000", () => {
  console.log("server is running and up at port 5000");
});

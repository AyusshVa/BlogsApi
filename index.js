const express = require("express");
const app = express();
const dotenv = require("dotenv");
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
    app.use("/api/auth", authRoute); // request of /api/ is sent to the register Route.
    app.use("/api/user", userRoute); // request of /api/ is sent to the register Route.
    app.use("/api/post", postRoute); // request of /api/ is sent to the register Route.
    app.use("/api/category", CategoryRoute); // request of /api/ is sent to the register Route.
  })
  .catch((err) => console.log(err.message));

app.listen("5000", () => {
  console.log("server is running and up at port 5000");
});

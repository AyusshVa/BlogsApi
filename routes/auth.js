// this is for the authentication ie register and login

const express = require("express");
const router = express.Router(); //  we will send this router(it will hold all the paths defined here) to index.js and it will act as app here.

const User = require("../models/User"); // this is the User model
const bcrypt = require("bcrypt");

//REGISTER:

// creating a user => sending a data to create the user; => post (as we are saving in the database.)
// path-> /register, for registering.
// post will be a async funciton as it will take time to send the data and update the database

router.post("/register", async (req, res) => {
  try {
    // ****** hasing password with bcrypt******************
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      // User is the usermodel, we will send some data to /register and we can get it using req.body;

      username: req.body.username, // making a new user object with the given data. we will save this new user object in the database.
      email: req.body.email,
      password: hashPass,
    });

    const user = await newUser.save(); // this will save the user in the databse and we have the user in the user variable.
    res.status(200).json(user); // sending the status code and user (sending as the response to the request which it recieve.)
  } catch (err) {
    res.status(500).json(err.message); // sending the error status of 500 and error message.
  }
});

// *************************** LOGIN ROUTE **************************
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }); // finding username fron the database.
    !user && res.status(400).json("wrong credentials"); // if no user present, sending error status 400 and sending the message.

    // decrypting the password using bcrypt:
    const validate = await bcrypt.compare(req.body.password, user.password); // comparing password of user stored and password typed. (returns a bool)
    !validate && res.status(400).json("wrong credentials");

    const { password, ...others } = user._doc; // ...others, this is spread operator, and it stores all elements other than password.(as an object.)
    // all the user related info is in user._doc

    res.status(200).json(others); // sending everything other than password as a json.
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

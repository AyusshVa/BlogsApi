// upadte / delete users.

const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post"); // we are taking post as if a user is deleted, then all his posts will also be deleted.
const bcrypt = require("bcrypt");

// UPDATE: updating the username or password of the user.
// ie we are required to fill a form in which the updated username and updated password is mentioned which is in req.body
router.put("/:id", async (req, res) => {
  // we will send a user as a form who we want to update, and the url will include the user's id.
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt); // this step is because when we update the password, it should be stored as hashed form

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body, // set/update every datamember of the req and store the updated version in the database.
          },
          { new: true } // this is to update in the field also along with the database.
        );

        res.status(200).json("user has been updated");
      } catch (err) {
        res.json(err.message);
      }
    }
  } else {
    res.status(401).json("you can update only your account"); // if we try to update another user, the userID filled in the form will not match our user's id.
  }
});

//  DELETE

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id); // if here the user is not found, then it will leave the try block and reach the catch
      if (user) {
        try {
          await Post.deleteMany({ username: user.username }); // deleting all post by the user.
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(404).json("user not found");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

// GET user ie to fetch user.
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

// CRUD of posts
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post"); // we are taking post as if a user is deleted, then all his posts will also be deleted.

// *********************** CREATE POST

router.post("/", async (req, res) => {
  const post = new Post(req.body); // creating a new post with req.body as param, another was is to (new Post({enter the datamembers}))
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//  ******************************* DELETE POST // will be sending the usename and id of post. (or complete schema)

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      // if user of that post matches the body username
      try {
        await post.delete();
        res.status(200).json("post is deleted");
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(401).json("you can only delete only your posts");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ****************************************** UPDATE POST
// idea is that when we click on update button of the post, then it will redirect to the /:id (of post)
// we are going to send the updataed post as a json ie in form, and we will update it in the database.
// NOTE the username that we  seding should be same as the original as its a criteria to give authority to update their users only
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      // if user of that post matches the body username
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err.message);
      }
    } else {
      res.status(401).json("you can only update your posts");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ************************************************** GET POST (send every data about the post (important is username and id))
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ************************************************** GET all posts

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let postsArr;
    if (username) {
      postsArr = await Post.find({ username });
    } else if (catName) {
      postsArr = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      postsArr = await Post.find();
    }
    res.status(200).json(postsArr);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;

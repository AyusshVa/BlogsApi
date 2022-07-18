const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// make a new categrory

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get all categories

router.get("/all", async (req, res) => {
  try {
    let categoryArr = await Category.find();
    res.status(200).json(categoryArr);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;

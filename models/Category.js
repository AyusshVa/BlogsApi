const mongoose = require("mongoose");

// defining the category schema:

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timesstamps: true }
);

// exporting the mongoose model of post named User (ie the collection)
module.exports = mongoose.model("Category", CategorySchema);

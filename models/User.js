const mongoose = require("mongoose");

// defining the userSchema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timesstamps: true } // this will give info about when the user is created and when its edited.
);

// exporting the mongoose model of user named User (ie the collection)
module.exports = mongoose.model("User", UserSchema);

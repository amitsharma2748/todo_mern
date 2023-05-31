const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    lowercase: true,
    uppercase: true,
    minLength: 6,
  },
});
module.exports = mongoose.model("Login", loginSchema);

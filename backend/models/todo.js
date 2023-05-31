const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  tasks: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      completed: {
        type: Number,
        required: true,
        enum: {
          values: [0, 1],
          message: "{VALUE} is not supported",
        },
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Todo", todoSchema);

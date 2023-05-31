const User = require("../models/loginModel");
const todo = require("../models/todo");
const Todo = require("../models/todo");
exports.loginUser = async (req, res, next) => {
  const { name, password } = req?.body;
  if (password.length < 6) {
    return res.status(400).json({
      message: "Login Failed password should be more than 6 characters",
    });
  }
  // console.log(name);
  const isUser = await User.findOne({ name: name, password: password });

  if (isUser) {
    const todos = await Todo.find({ user: isUser?._id });

    return res.json({
      success: true,
      user: isUser,
      todos,
    });
  } else {
    const user = await User.create({
      name,
      password,
    });
    return res.status(200).json({
      success: true,
      user,
      message: "Login success",
    });
  }
};

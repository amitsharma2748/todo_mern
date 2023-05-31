const Todo = require("../models/todo");
const User = require("../models/loginModel");
exports.addTask = async (req, res, next) => {
  const { tasks, user } = req?.body;
  const isTodo = await Todo.find({ _id: user });
  // console.log("z", tasks, user);
  if (isTodo !== []) {
    const todos = await Todo.findOneAndUpdate(
      { user: user },
      { $set: { tasks: tasks } },
      { new: true }
    )
      .then((doc) => {
        // console.log("updates", doc);
      })
      .catch((err) => {
        console.log("Something wrong when updating data!");
      });
    // console.log("x", todos);

    return res.json({
      success: true,
      user: isTodo,
      todos,
    });
  } else {
    const todo = await Todo.create({
      tasks,

      user,
    });
    // console.log("y", todo);
    return res.json({
      success: true,
      todo,
      message: "added successfully",
    });
  }
};
exports.getTask = async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  const todos = await Todo.find({ user: id });
  // console.log(todos[0].tasks);
  res.json({
    success: true,
    todos: todos[0]?.tasks,
  });
};

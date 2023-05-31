const express = require("express");
const { addTask, getTask } = require("../controllers/todoController");

const router = express.Router();

router.post("/todo", addTask);
router.get("/todo/:id", getTask);

module.exports = router;

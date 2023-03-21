const express = require("express");

const todoController = require("../controllers/todoController");

const router = express.Router();

router
  .route("/")
  .get(todoController.getAllTodo)
  .post(todoController.createTodo)
  .delete(todoController.deleteTodo);

router.route("/:id").patch(todoController.updateTodo);
router.route("/bulk").post(todoController.updateDragDrop);

module.exports = router;

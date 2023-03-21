const Todo = require("../models/TodoModel");

const getAllTodo = async (req, res) => {
  try {
    const todoList = await Todo.find();
    res.status(200).send({
      todoList: todoList.sort(function (currentItem, nextItem) {
        return nextItem.createdAt - currentItem.createdAt;
      }),
      length: todoList.length,
      requestTime: req.requestTime,
      status: 200,
    });
  } catch (error) {
    res.status(404).send({ message: error.message, status: 404 });
    return;
  }
};

const createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(
      Object.assign({
        createdAt: req.requestTime,
        ...req.body,
      })
    );
    res.status(201).json({
      status: "success",
      data: {
        todo: newTodo,
      },
    });
    return;
  } catch (error) {
    res.status(404).send({ message: error.message, status: 404 });
    return;
  }
};

const updateTodo = async (req, res) => {
  try {
    const newTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({
      status: "Success",
      data: {
        todo: newTodo,
      },
      message: "Update successful!",
    });
    return;
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "No data updated",
    });
    return;
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.query.id);
    if (Object.keys(todo)?.length > 0) {
      await Todo.findByIdAndDelete(req.query.id);
      res.status(200).send({
        status: "Success",
        data: {
          todo,
        },
        message: "Delete successful!",
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "No data deleted",
      });
    }
    return;
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "No data deleted",
    });
    return;
  }
};

module.exports = { getAllTodo, createTodo, updateTodo, deleteTodo };

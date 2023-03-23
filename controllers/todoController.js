const Todo = require("../models/TodoModel");

const getAllTodo = async (req, res) => {
  try {
    const todoList = await Todo.find();
    res.status(200).send({
      todoList: todoList.sort(function (currentItem, nextItem) {
        return nextItem.index - currentItem.index;
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
    const listTodo = await Todo.find({ status: req.body.status });
    const newTodo = await Todo.create(
      Object.assign({
        createdAt: req.requestTime,
        updatedAt: req.requestTime,
        ...req.body,
        index: listTodo.length + 1,
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
        updatedAt: req.requestTime,
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

const updateDragDrop = async (req, res) => {
  try {
    const bulkUpdate = [];
    for (let i = 0; i < req.body.todoList.length; i++) {
      const currentList = req.body.todoList[i].listJobs;
      for (let j = 0; j < currentList.length; j++) {
        bulkUpdate.push({
          updateOne: {
            filter: {
              _id: currentList[j]._id,
            },
            // If you were using the MongoDB driver directly, you'd need to do
            // `update: { $set: { field: ... } }` but mongoose adds $set for you
            update: {
              ...currentList[j],
            },
          },
        });
      }
    }

    Todo.bulkWrite(bulkUpdate).then((res) => {
      console.log("Documents Updated", res.modifiedCount);
    });

    res.status(200).send({
      status: "Success",
      message: "Update successful!",
    });
    return;
  } catch (error) {
    console.log({ error });
    res.status(404).json({
      status: "Failed",
      message: "No data change!",
    });
    return;
  }
};
module.exports = {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  updateDragDrop,
};

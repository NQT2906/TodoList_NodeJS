const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task must have a title"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    required: [true, "Task must have a status"],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  index: {
    type: Number,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;

const express = require("express");
const morgan = require("morgan");
const moment = require("moment");
const cors = require("cors");

const todoRouter = require("./router/todoRouter");

const app = express();

// Middleware

app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = moment();
  next();
});

app.use(cors());

// Router

app.use("/api/todo", todoRouter);
// app.use("/api/v1/users", userRouter);

// Server

module.exports = app;

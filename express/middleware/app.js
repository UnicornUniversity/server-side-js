"use strict";

const express = require("express");
const bookRouter = require("./controller/book-controller");
const bookImageRouter = require("./controller/book-image-controller");

const loggerFactory = require("./component/logger-factory");
loggerFactory.setLevel("INFO")

const loggingMiddleware = require("./middleware/logging-middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(loggingMiddleware);

app.use("/book", bookRouter);
app.use("/bookImage", bookImageRouter);


app.listen(3000, () => {
  console.log("Express server listening on port 3000.")
});
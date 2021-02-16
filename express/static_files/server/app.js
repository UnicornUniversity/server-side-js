"use strict";
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bookRouter = require("./controller/book-controller");
const bookImageRouter = require("./controller/book-image-controller");

const loggerFactory = require("./component/logger-factory");
loggerFactory.setLevel("INFO")

const loggingMiddleware = require("./middleware/logging-middleware");

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(loggingMiddleware);

app.use("/book", bookRouter);
app.use("/bookImage", bookImageRouter);


app.listen(3000, () => {
  console.log("Express server listening on port 3000.")
});
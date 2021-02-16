"use strict";

const express = require("express");
const bookRouter = require("./controller/book-controller");
const bookImageRouter = require("./controller/book-image-controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/book", bookRouter);
app.use("/bookImage", bookImageRouter);


app.listen(3000, () => {
  console.log("Express server listening on port 3000.")
});
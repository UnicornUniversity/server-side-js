"use strict";

const express = require("express");
const bookRouter = require("./controller/book-controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/book", bookRouter);


app.listen(3000, () => {
  console.log("Express server listening on port 3000.")
});
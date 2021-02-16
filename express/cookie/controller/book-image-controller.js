const express = require("express");
const router = express.Router();

const Busboy = require("busboy");
const CreateAbl = require("../abl/book-image/create-abl");
const GetAbl = require("../abl/book-image/get-abl");


router.post("/create", (req,res) => {
  let busboy = new Busboy({ headers: req.headers, limits: {files: 1} });
  CreateAbl(busboy, res)
  req.pipe(busboy);
});

router.get("/get", async (req, res) => {
  const { query } = req;
  await GetAbl(query, res)
});

module.exports = router
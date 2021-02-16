const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/book/create-abl");
const GetAbl = require("../abl/book/get-abl");


  router.get("/get", async (req, res) => {
    const { query, cookies } = req;
    await GetAbl(query, cookies, res)
  });

  router.post("/create", async (req, res) => {
    const { body } = req;
    await CreateAbl(body, res)
  });

module.exports = router
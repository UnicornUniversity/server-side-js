const fs = require("fs");
const path = require("path");
const Ajv = require("ajv").default;
const { getBookImageSchema } = require("../../schemas/book-image-schemas");

async function GetAbl(query, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(getBookImageSchema, query);

  if (!valid) {
    return res.status(400).json({error: ajv.errors});
  }

  let pathToImage = path.join(__dirname, "..", "..", "storage", query.code + ".png");

  try {
    await fs.promises.access(pathToImage, fs.F_OK);
  } catch (e) {
    res.status(400).json(
        {error: `Book with code '${query.code}' doesn't not have image yet.`})
  }

  res.sendFile(pathToImage);
}

module.exports = GetAbl;
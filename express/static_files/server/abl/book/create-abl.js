const path = require("path");
const Ajv = require("ajv").default;
const LibraryDao = require("../../dao/library-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "books.json"))
const { createBookSchema } = require("../../schemas/book-schemas");

async function CreateAbl(body, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(createBookSchema, body);

  if (!valid) {
    return res.status(400).json({error: ajv.errors});
  }

  const book = {
    code: body.code,
    name: body.name,
    author: body.author
  };

  try {
    await dao.addBook(book);
  } catch (e) {
    if (e.code === "DUPLICATE_CODE") {
      res.status(400);
    } else {
      res.status(500);
    }
    return res.json({error: e.message});
  }

  res.json(book);
}

module.exports = CreateAbl;
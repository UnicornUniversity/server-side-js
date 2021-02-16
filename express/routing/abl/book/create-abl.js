const path = require("path");
const LibraryDao = require("../../dao/library-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "books.json"))

async function CreateAbl(body, res) {
  if (!body.code || !body.name || !body.author) {
    return res.status(400).json({error: 'Invalid input: code parameter is missing.'});
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
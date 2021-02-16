const path = require("path");
const LibraryDao = require("../../dao/library-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "books.json"))

async function GetAbl(query, res) {
  const bookCode = query.code;
  if (!bookCode) {
    return res.status(400).json({error: 'Invalid input: code parameter is missing.'});
  }

  const book = await dao.getBook(bookCode);

  if (!book) {
    return res.status(400).json({error: `Book with code '${bookCode}' doesn't exist.`});
  }

  res.json(book);
}

module.exports = GetAbl;
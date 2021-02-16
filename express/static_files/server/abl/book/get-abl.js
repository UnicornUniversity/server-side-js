const path = require("path");
const Ajv = require("ajv").default;
const LibraryDao = require("../../dao/library-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "books.json"))
const { getBookSchema } = require("../../schemas/book-schemas");

async function GetAbl(query, cookies, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(getBookSchema, query);

  if (!valid) {
    return res.status(400).json({error: ajv.errors});
  }

  const bookCode = query.code;
  const book = await dao.getBook(bookCode);

  if (!book) {
    return res.status(400).json({error: `Book with code '${bookCode}' doesn't exist.`});
  }


  let visitedBooks = cookies["visitedBooks"] || [];
  if (visitedBooks.indexOf(bookCode) === -1 ) {
    visitedBooks.push(bookCode);
  }

  res.cookie("visitedBooks", visitedBooks)

  res.json({ book, visitedBooks });
}

module.exports = GetAbl;
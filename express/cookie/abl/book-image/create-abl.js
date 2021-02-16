const fs = require("fs");
const path = require("path");
const Ajv = require("ajv").default;
const LibraryDao = require("../../dao/library-dao");
let dao = new LibraryDao(path.join(__dirname, "..", "..", "storage", "books.json"))
const { createBookImageSchema } = require("../../schemas/book-image-schemas");

async function CreateAbl(busboy, res) {
  let dtoIn = {};
  busboy.on("field", function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    dtoIn[fieldname] = val;
  });

  busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
    const ajv = new Ajv();
    const valid = ajv.validate(createBookImageSchema, dtoIn);

    if (!valid) {
      return res.status(400).json({error: ajv.errors});
    }

    const book = await dao.getBook(dtoIn.code);
    if (!book) {
      return res.status(400).json({error: `Book with code '${dtoIn.code}' doesn't exist.`});
    }

    if (mimetype !== "image/png") {
      return res.status(400).json({error: `Only supported mimetype is image/png`});
    }

    let saveTo = path.join(__dirname, "..", "..", "storage", dtoIn.code + ".png");
    let writeStream = fs.createWriteStream(saveTo);
    file.pipe(writeStream);
  });

  busboy.on("finish", function() {
    res.json({ status: "File succesfully uploaded!" });
  });

  busboy.on("error", err => {
    res.json({error: err})
  });
}

module.exports = CreateAbl;
const Busboy = require("busboy");

const RE_MIME = /^(?:multipart\/.+)$/i;

function multipartParser(req, res, next) {
  if (req.method !== "POST" || !RE_MIME.test(_mime(req)) || !_hasBody(req) ) {
    next();
  } else {

    let cfg = {
      limits: {
        files: 1
      }
    };
    cfg.headers = req.headers;

    let busboy;

    try {
      busboy = new Busboy(cfg);
    } catch (err) {
      return next(err);
    }

    req.body = {};

    busboy.on("field",
        (fieldname, val, fieldnameTruncated, valTruncated, encoding,
            mimetype) => {
          // try converting JSON value to Object
          if (mimetype === "application/json") {
            try {
              val = JSON.parse(val);
            } catch (err) {
              return next(err);
            }
          }

          req.body[fieldname] = val;
        });

    // handle Busboy file events
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      file.on("error", err => {
        return next(err)
      });

      // attach file stream to body object under its fieldname
      req.body[fieldname] = file;

      let stream = req.body[fieldname];

      // attach file metadata to the stream object
      stream.filename = filename;
      stream.contentType = mimetype;
      next();
    })

    // handle error events
    busboy.on("error", err => {
      return next(err);
    });

    // pipe request to Busboy for parsing
    req.pipe(busboy);
  }
}

function _mime(req) {
  let str = req.headers["content-type"] || "";
  return str.split(";")[0];
}

function _hasBody(req) {
  let encoding = "transfer-encoding" in req.headers,
      length = "content-length" in req.headers && req.headers["content-length"] !== "0";
  return encoding || length;
}

module.exports = multipartParser;
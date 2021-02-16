"use strict";

const getBookImageSchema = {
  "type": "object",
  "properties": {
    "code": { "type": "string"},
  },
  "required": ["code"]
};

const createBookImageSchema = {
  "type": "object",
  "properties": {
    "code": { "type": "string"},
  },
  "required": ["code"]
};

module.exports = {
  createBookImageSchema,
  getBookImageSchema,
};
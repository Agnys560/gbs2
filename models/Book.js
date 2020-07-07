const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  synopsis: String,
  date: { type: Date, default: Date.now },
  thumbnail: { type: String },
  link: String
});

var Book = mongoose.model("Book", BookSchema);
module.exports = Book;

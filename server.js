const GOOGLE_API_KEY = "AIzaSyACTYym68zoTsukMZ9cAWm123nbMMvqk74";

const mongoose = require("mongoose");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
const db = require("./models");

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Define API routes here
app.get("/api/books", (req, res) => {
  // return all saved books as JSON
  db.Book.find({}, (err, dbBooks) => {
    if (err) res.status(422).json(err);
    else res.json(dbBooks);
  });
});

app.post("/api/books", (req, res) => {
  // save a new book to the database
  db.Book.create(req.body, (err, dbBooks) => {
    if (err) res.status(422).json(err);
    else res.status(201).json(dbBooks);
  });
});

app.delete("/api/books/:id", (req, res) => {
  // delete a book from the database by Mongo _id
  db.Book.findOneAndDelete({ _id: req.params.id }, (err, dbBooks) => {
    if (err) res.status(422).json(err);
    else res.status(200).json(dbBooks);
  });
});

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

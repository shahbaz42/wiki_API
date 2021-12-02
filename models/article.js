const mongoose = require("mongoose");

// connect to the database
mongoose.connect(
  process.env.DB_URL || "mongodb://localhost:27017/wikiDB",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to the DB");
    }
  }
);

// create a schema
const articleSchema = {
  title: String,
  content: String,
};

// create a model
const Article = mongoose.model("Article", articleSchema); // create the model for the articles

module.exports = Article; // export the model

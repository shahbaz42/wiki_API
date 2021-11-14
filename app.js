const express = require("express");  // Express web server framework
const mongoose = require("mongoose");  // MongoDB integration

app = express();  // create an instance of express

app.set("view-engine", "ejs");  // set the view engine to ejs

app.use(express.urlencoded({ extended: true }));  // use express.urlencoded to parse the body of the request

app.use(express.static("public"));  // use express.static to serve static files

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });  // connect to the database

const articleSchema = {  // create the schema for the articles
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);  // create the model for the articles

// Requests targetting all articles.

app
  .get("/articles", (req, res) => {  // get all articles
    Article.find(function (err, results) {
      if (!err) {
        res.send(results);
      } else {
        console.log(err);
      }
    });
  })
  .post("/articles", (req, res) => {  // create a new article
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    article.save((err, success) => {
      if (!err) {
        res.send("Successfully added a new article");
      } else {
        res.send(err);
      }
    });
  })
  .delete("/articles", (req, res) => {  // delete all articles  
    Article.deleteMany({}, function (err) {
      if (!err) {
        res.send("Successfully deleted all articles");
      } else {
        res.send(err);
      }
    });
  });

// Requests targetting a specific article

app
  .route("/articles/:articleTitle") // route for specific article

  .get(function (req, res) {
    Article.findOne({ title: req.params.articleTitle }, (err, found) => { // find the article
      if (found) {
        res.send(found);
      } else {
        res.send("No article found.");
      }
    });
  })
  .put(function (req, res) {
    Article.replaceOne(
      { title: req.params.articleTitle },
      {
        title: req.body.title,
        content: req.body.content
      },
      (err, result) => {
        if (!err) {
          res.send("Successfully replaced");
        } else {
          res.send(err);
        }
      }
    );
  })
  .put(function (req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      {
        title: req.body.title,
        content: req.body.content
      },
      (err, result) => {
        if (!err) {
          res.send("Successfully updated selected article");
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete(function(req, res){
    const articleTitle = req.params.articleTitle;
    Article.findOneAndDelete({title: articleTitle}, function(err){
      if (!err){
        res.send("Successfully deleted selected article.");
      } else {
        res.send(err);
      }
    });
  });

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

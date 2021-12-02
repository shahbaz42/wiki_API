const Article = require("../models/article");

// get all articles
exports.getAllArticles = (req, res) => {
  Article.find(function (err, results) {
    if (!err) {
      res.send(results);
    } else {
      console.log(err);
    }
  });
};

// create a new article
exports.postArticle = (req, res) => {
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
};

// delete all articles
exports.deleteAllArticles = (req, res) => {
  Article.deleteMany({}, function (err) {
    if (!err) {
      res.send("Successfully deleted all articles");
    } else {
      res.send(err);
    }
  });
};
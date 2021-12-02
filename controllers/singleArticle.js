const Article = require("../models/article");

// find the article
exports.getSingleArticle = (req, res) => {
  Article.findOne({ title: req.params.articleTitle }, (err, found) => {
    if (found) {
      res.send(found);
    } else {
      res.send("No article found.");
    }
  });
};

// replace the article
exports.replaceArticle = (req, res) => {
  Article.replaceOne(
    { title: req.params.articleTitle },
    {
      title: req.body.title,
      content: req.body.content,
    },
    (err, result) => {
      if (!err) {
        res.send("Successfully replaced");
      } else {
        res.send(err);
      }
    }
  );
};

// update the article
exports.updateArticle = (req, res) => {
  Article.updateOne(
    { title: req.params.articleTitle },
    {
      title: req.body.title,
      content: req.body.content,
    },
    (err, result) => {
      if (!err) {
        res.send("Successfully updated selected article");
      } else {
        res.send(err);
      }
    }
  );
};

// delete the article
exports.deleteArticle = (req, res) => {
  const articleTitle = req.params.articleTitle;
  Article.findOneAndDelete({ title: articleTitle }, function (err) {
    if (!err) {
      res.send("Successfully deleted selected article.");
    } else {
      res.send(err);
    }
  });
};

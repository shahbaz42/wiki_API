const express = require("express");

// importing Article Model
const Article = require("../models/article");

// to use the router
const router = express.Router();

// importing controllers
const allArticlesController = require("../controllers/allArticles");
const singleArticleController = require("../controllers/singleArticle");

// Requests targetting all articles.
router.route("/articles")
  .get(allArticlesController.getAllArticles)
  .post(allArticlesController.postArticle)
  .delete(allArticlesController.deleteAllArticles);

// Requests targetting a specific article
router.route("/articles/:articleTitle") 
  .get(singleArticleController.getSingleArticle)
  .put(singleArticleController.replaceArticle)
  .patch(singleArticleController.updateArticle)
  .delete();

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");

app = express();

app.set("view-engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
  Article.find(function(err, results){
    if(!err){
        res.send(results);
    } else{
        console.log(err);
    }
  });
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

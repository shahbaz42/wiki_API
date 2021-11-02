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
})
.post("/articles", (req, res)=>{
    const article = new Article({
        title : req.body.title,
        content: req.body.content 
    })
    article.save((err, success)=>{
        if(! err){
            res.send("Successfully added a new article");
        } else {
            res.send(err);
        }
    })
})
.delete("/articles", (req, res)=>{
    Article.deleteMany({}, function(err){
        if(! err){
            res.send("Successfully deleted all articles");
        } else{
            res.send(err);
        }
    });
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

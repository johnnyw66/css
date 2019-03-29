//jshint esversion:6
const path = require('path') ;
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const db = require(path.join(__dirname,'dbMongooseSupport.js')) ;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});


app.route("/articles")

.get( (req,res) => {

  db.getAllArticles()

  .then((articles)=>{
    console.log("Articles",articles) ;
    res.send(articles) ;
  })

  .catch((err) => {
    console.log("ERR",err) ;
    res.send(err) ;
  }) ;

})

.post( (req,res) => {

  const {title,content} = req.body ;

  db.addPost(title,content)

  .then((dbres)=>{
    res.send(dbres) ;
  })

  .catch((err)=>{
    res.send(err) ;
  }) ;

})

.delete( (req,res) => {

  db.removeAllPosts()

  .then((articles)=>{
    console.log("Articles",articles) ;
    res.send(articles) ;
  })

  .catch((err) => {
    console.log("ERR",err) ;
    res.send(err) ;
  }) ;

}) ;



// Individual articles with given Id
app.route("/articles/:id")

.get((req,res) => {

    const {id} = req.params ;

    db.getArticleFromId(id)
    .then((article) => {
      console.log("Article",article) ;
      res.send(article) ;
    })

    .catch((err) => {
      console.log("ERR",err) ;
      res.send(err) ;
    }) ;
} )

.delete((req,res) => {

    const {id} = req.params ;

    db.removePost(id)

    .then((article) => {
      console.log("Article",article) ;
      res.send(article) ;
    })

    .catch((err) => {
      console.log("ERR",err) ;
      res.send(err) ;
    }) ;
} )

.put((req,res) => {

    const {id} = req.params ;
    const {title,content} = req.body ;
    db.updatePost(id,title,content)

    .then((article) => {
      console.log("Article",article) ;
      res.send(article) ;
    })

    .catch((err) => {
      console.log("ERR",err) ;
      res.send(err) ;

    }) ;


})

.patch((req,res) => {

    const {id} = req.params ;
    // Only modified those fields supplied in the patch request
    db.patchPost(id,req.body)

    .then((article) => {
      console.log("Article",article) ;
      res.send(article) ;
    })

    .catch((err) => {
      console.log("ERR",err) ;
      res.send(err) ;

    }) ;

}) ;

// Allow to search by Title
app.route("/articles/title/:title")
.get((req,res) => {

    const {title} = req.params ;

    db.getArticleFromTitle(title)

    .then((article) => {
      console.log("Articles",article) ;
      res.send(article) ;
    })

    .catch((err) => {
      console.log("ERR",err) ;
      res.send(err) ;
    }) ;
} ) ;

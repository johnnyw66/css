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
// GET
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
// POST
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
// DELETE
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
      console.log("Articles",article) ;
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
      console.log("Articles",article) ;
      res.send(article) ;
    })

    .catch((err) => {
      console.log("ERR",err) ;
      res.send(err) ;
    }) ;
} ) ;






//DELETE
// app.delete("/articles/:id", (req,res) => {
//   const {id} = req.params ;
//   db.removePost(id).then((article)=>{
//     console.log("Articles",article) ;
//     res.send(article) ;
//   }).catch((err) => {
//     console.log("ERR",err) ;
//     res.send("GET ERROR") ;
//   }) ;
//
// } ) ;


// UPDATE
app.put("/", (req,res) => {
    res.send("PUT OK") ;
} ) ;

app.patch("/", (req,res) => {
    res.send("PUT OK") ;
} ) ;

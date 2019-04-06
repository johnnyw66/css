//jshint esversion:6
require('dotenv').config() ;
const path = require('path') ;

const express = require('express') ;
const bodyParser = require('body-parser') ;
const ejs = require('ejs') ;
const app = express() ;
const db = require(path.join(__dirname,"/dbsupport.js")) ;

app.use(express.static('public')) ;
app.set('view engine','ejs') ;
app.use(bodyParser.urlencoded({extended: true})) ;


app.listen(3000,()=>{
  console.log('Server Started') ;
})


app.get("/",(req,res)=> {
    res.render("home") ;
}) ;


// Login Route
app.route("/login")

.get((req,res) => {
    res.render("login") ;
})

.post((req,res)=> {

    const {username,password} = req.body ;

    db.retrieveAuthenticatedUser(username,password)

    .then((user) => {

      console.log("login Return",user)
      if (user) {
        res.redirect("secrets") ;
      } else {
        res.render("loginfailed") ;
      }

    })
    .catch((err) => {
      console.log("Catch Error", err) ;
      res.render("loginfailed") ;

    }) ;

}) ;



// Register Route
app.route("/register")

.get((req,res) => {
    res.render("register") ;
})

.post((req,res) => {
  const {username,password} = req.body ;

  console.log("Credentials",username,password) ;

  db.register(username,password)
  .then((user)=>{
    console.log(user) ;
    res.redirect("/login") ;
  })
  .catch((err) => {
    console.log(err) ;
    res.render("registerfailed") ;

  }) ;

}) ;


// Secrets Route
app.route("/secrets")

.get((req, res)=> {
    res.render("secrets") ;
})

.post((req, res) => {

  // const {secret,password} = req.body ;

}) ;


app.get("/logout",(req, res)=> {
    res.redirect("/") ;
}) ;

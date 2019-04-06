//jshint esversion:6
const remoteDB = "mongodb://localhost:27017/secretsDB" ;
const localDB  = "mongodb://localhost:27017/secretsDB" ;

require('dotenv').config() ;
const path = require('path') ;
const mongoose = require('mongoose') ;


const session = require('express-session') ;
const passport = require('passport') ;
const passportLocalMongoose = require('passport-local-mongoose') ;

const express = require('express') ;
const bodyParser = require('body-parser') ;

const ejs = require('ejs') ;
const app = express() ;

app.use(express.static('public')) ;
app.set('view engine','ejs') ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(session({
  secret: "Our Little Secret!",
  resave: false,
  saveUninitialized: false
})) ;

app.use(passport.initialize()) ;
app.use(passport.session()) ;

mongoose.connect(localDB,{useNewUrlParser:true}) ;
mongoose.set('useCreateIndex', true);


const userSchema = new mongoose.Schema({
      email: {type: String, required: true, unique: true},
    // password: {type: String},
    // gotit: {type: String},
    //

    // password: {type: String, required:true}
}) ;

userSchema.plugin(passportLocalMongoose) ;

const User =  new mongoose.model('User',userSchema) ;

passport.use(User.createStrategy()) ;

passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser()) ;

const auth = passport.authenticate("local") ;

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
    console.log("Credentials",username,password) ;
    const user = new User({username:username, password:password}) ;

    req.login(user,(err) => {
        console.log("LOGIN!",err)
        if (err) {
          console.log(err) ;
          res.redirect("/") ;
        } else {
          console.log("AUThENTICATE!",err)
           auth(req,res,(err)=>{
              console.log(">>>>>Auth... Redirecting",err) ;
              res.redirect("/secrets") ;
          }) ;
        }
    }) ;

}) ;



// Register Route
app.route("/register")

.get((req,res) => {
    res.render("register") ;
})

.post((req,res) => {
  const {username,password} = req.body ;
  console.log("Email-Username",username,"Password",password) ;

   User.register({username:username,email:username},password,(err,user)=>{
      console.log("User",user) ;
        if (err) {
           console.log(err) ;
           res.redirect("/register") ;
       } else {
             auth(req,res, () => {
                console.log("Authorization move to secrets",req,res) ;
                 res.redirect("/secrets") ;
             }) ;
       }
}) }) ;


// Secrets Route
app.route("/secrets")

.get((req, res)=> {
    if (req.isAuthenticated()) {
      res.render("secrets") ;
    } else {
      console.log("Not Authenticated!") ;
      res.redirect("/login") ;
    }
})

.post((req, res) => {

  // const {secret,password} = req.body ;

}) ;


app.get("/logout",(req, res)=> {
    req.logout() ;
    res.redirect("/") ;
}) ;

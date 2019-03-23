//jshint esversion:6

// import modules
const path = require('path')
const express = require("express") ;
const bodyParser = require("body-parser") ;
const ejs = require("ejs") ;
const errorHandler = require('errorhandler');


// import local modules
const datemod = require(path.join(__dirname, 'dateSupport.js'))

const toDoList = [] ;
const workList = [] ;

const app = express() ;


console.log(datemod) ;

// ejs.set('partials', path.join(__dirname, 'partials'))


app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('partials', path.join(__dirname, 'partials'))
.set('view engine', 'ejs')
.set('view options', {delimiter: '%'})
.use(bodyParser.urlencoded( {
    extended: true
}));


app.listen(process.env.PORT || 3000, () => {
  console.log("Listening...");
});

app.post(["/","/work"],(req,res)=>{
  const {originalUrl} = req ;
  const list = (originalUrl === "/" ? toDoList : workList) ;
  list.push(req.body.todo) ;
  res.redirect(originalUrl) ;

}) ;

app.get(["/","/work"],(req,res)=>{

  const {originalUrl} = req ;
  const list = (originalUrl === "/" ? toDoList : workList) ;

  // prepare render view

  const day = datemod.getDay() ;
  const dayStyle = (day === 0 || day === 6) ? "weekend" : "weekday";
  const renderedToDoList = renderList(list,"div","item") ;
  const formatDate = datemod.formattedDate() ;

  res.render('todolist', {
                          dayStyle: dayStyle,
                          currentDay: formatDate,
                          renderedToDoList: renderedToDoList,
                          returnPost: originalUrl
                        });  // views/list.ejs

}) ;


 // any other pages - remove leading '/' and attempt to render that

 app.get("*",(req,res) => {
  try {
    console.log("Attempting to render " + req.originalUrl) ;
    res.render(req.originalUrl.substr(1)) ;
  } catch(e) {
    res.render("error") ;
  }
 }) ;

// Rendering

function renderView(tag,item,cls="") {
  return `<${tag} class='${cls}'><input type='checkbox'><p>${item}</p></${tag}>` ;
}

function renderList(list,renderType,cls) {
  var rendered = list.map((item) => { return renderView(renderType,item,cls) ; }).join("") ;
  return rendered ;
}


// app.get("/eg",(req,res)=>{
//
//   let currentDate = new Date() ;
//   let currentDay = currentDate.getDay() ;
//
//   res.write("") ;
//   res.write("") ;
//   res.end("") ;
//
// }) ;
//
// app.get("/index.html",(req,res)=>{
//
//   let currentDate = new Date() ;
//   let currentDay = currentDate.getDay() ;
//
//   res.sendFile("/index.html") ;
//
// }) ;

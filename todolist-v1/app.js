//jshint esversion:6

const path = require('path')
const express = require("express") ;
const bodyParser = require("body-parser") ;
const ejs = require("ejs") ;

const daysOfTheWeek = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] ;

const app = express() ;

const toDoList = [] ;


app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.set('view options', {delimiter: '%'})
.use(bodyParser.urlencoded( {
    extended: true
}));


app.listen(process.env.PORT || 3000, () => {
  console.log("Listening...");
});

app.post("/",(req,res)=>{
  toDoList.push(req.body.todo) ;
  console.log(toDoList) ;
  res.redirect("/") ;

}) ;

app.get("/",(req,res)=>{

  let currentDate = new Date() ;
  let day = currentDate.getDay() ;

  // var currentDay = daysOfTheWeek[ day % daysOfTheWeek.length] ;

  let currentDay = currentDate.toLocaleDateString("en-US",{
    weekday:"long",
    day: "numeric",
    month: "long",
    // year: "numeric"
  }) ;

  let dayStyle = (day === 0 || day === 6) ? "weekend" : "weekday";
  let renderedToDoList = renderList(toDoList,"div","item") ;

  res.render('todolist', {
                          dayStyle: dayStyle,
                          currentDay: currentDay,
                          renderedToDoList: renderedToDoList
                        });  // views/list.ejs

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

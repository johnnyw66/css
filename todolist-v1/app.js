//jshint esversion:6

const path = require('path')
const express = require("express") ;
const bodyParser = require("body-parser") ;
const ejs = require("ejs") ;

const daysOfTheWeek = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] ;

const app = express() ;

const toDoList = [] ;
const workList = [] ;


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

app.post(["/","/work"],(req,res)=>{
  const {originalUrl} = req ;
  const list = (originalUrl === "/" ? toDoList : workList) ;
  list.push(req.body.todo) ;
  res.redirect(originalUrl) ;

}) ;

app.get(["/","/work"],(req,res)=>{

  const {originalUrl} = req ;
  const list = (originalUrl === "/" ? toDoList : workList) ;

  let currentDate = new Date() ;
  let day = currentDate.getDay() ;
  console.log(req.originalUrl) ;

  let currentDay = currentDate.toLocaleDateString("en-US",{
    weekday:"long",
    day: "numeric",
    month: "long",
    // year: "numeric"
  }) ;

  let dayStyle = (day === 0 || day === 6) ? "weekend" : "weekday";
  let renderedToDoList = renderList(list,"div","item") ;

  res.render('todolist', {
                          dayStyle: dayStyle,
                          currentDay: currentDay,
                          renderedToDoList: renderedToDoList,
                          returnPost: originalUrl
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

//jshint esversion:6

// import modules
const path = require('path')
const express = require("express") ;
const bodyParser = require("body-parser") ;
const ejs = require("ejs") ;
const errorHandler = require('errorhandler');

// import local modules
const datemod = require(path.join(__dirname, 'dateSupport.js'))
const dbdata = require(path.join(__dirname, 'dbSupport.js'))


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


app.get("/",(req,res) => {
    res.redirect("/home") ;
}) ;


// Ignore GET /delete  - just redirect
app.get("/delete",(req,res)=>{
  res.redirect("/home") ;
}) ;


// Infortunately Forms do not support the 'delete' method.

app.post("/delete",(req,res)=>{
  const {id} = req.body ;
  const referer = req.headers.referer ;
  console.log("id",id) ;

  dbdata.delete(id).then((result)=>{

    res.redirect(referer) ;

  }).catch((error)=>{

  });

}) ;

app.post("/:listname",(req,res)=>{

  const {listname} = req.params ;

  dbdata.add(listname,req.body.todo).then((message)=>{

    console.log("RESOLVED FROM dbdata.add ->",message) ;
    // redirect to GET
    res.redirect("/" + listname) ;

  }).catch((error)=>{
      // Add failed
  });

}) ;


app.get("/:listname",(req,res)=>{

  const {listname} = req.params ;

  dbdata.getListFromName(listname).then((list) => {

    const day = datemod.getDay() ;
    const dayStyle = (day === 0 || day === 6) ? "weekend" : "weekday";
    const renderedToDoList = renderList(list,"div","item") ;
    const formatDate = datemod.formattedDate() ;

    res.render('todolist', {
                            dayStyle: dayStyle,
                            currentDay: formatDate,
                            renderedToDoList: renderedToDoList,
                            returnPost: listname,
                            listName:listname
                          });  // views/list.ejs
  }).catch((reason)=>{

  }) ;


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
  return `<form action='/delete' method='post'><${tag} class='${cls}'><input type='checkbox'  name='id' value='${item._id}' onChange = 'this.form.submit()'><p>${item.title}</p></${tag}></form>` ;
}

function renderList(list,renderType,cls) {
  var rendered = list.map((item) => { return renderView(renderType,item,cls) ; }).join("") ;
  return rendered ;
}

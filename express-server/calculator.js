//jshint esversion:6

const express = require("express") ;
const bodyParser = require("body-parser") ;

const app = express() ;
app.use(bodyParser.urlencoded({extended: true})) ;

app.get("/",(request,response)=>{
  response.header("text/html");
  response.sendFile(__dirname+"/index.html") ;
});

app.post("/",(request,response)=>{

  var calcBodyResponse = request.body ;
  var var1 = calcBodyResponse.var1 ;
  var var2 = calcBodyResponse.var2 ;
  //var action = calcRequest.calcAction ;

  response.header("text/html");
  // response.send("Calc Result " + (parseInt(var1) + parseInt(var2))) ;
  response.send("Calc Result " + (Number(var1) + Number(var2))) ;

});

app.get("/bmicalculator",(request,response)=>{
  response.header("text/html");
  response.sendFile(__dirname+"/bmicalculator.html") ;
});

app.post("/bmicalculator",(request,response)=>{
  response.header("text/html");
  var urlEncForm = request.body ;
  var weight = Number(urlEncForm.weight) ;
  var height = Number(urlEncForm.height) ;

  response.send("YOUR BMI Result " + Math.floor(weight/(height*height))) ;
});


app.listen(3000, () => {
  console.log("listening!") ;
}) ;

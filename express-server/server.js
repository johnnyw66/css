//jshint esversion:6

const express = require("express") ;

const app = express() ;

app.get("/",(request,response)=>{
  response.header("plain/text");
  response.send("Hello!") ;
});

app.get("/contact",(request,response)=>{
  response.header("plain/text");
  response.send("Contact me!") ;
});

app.get("/hobbies",(request,response)=>{
  response.header("plain/text");
  response.send("I drive!") ;
});

app.get("/aboutme",(request,response)=>{
  response.header("plain/text");
  response.send("I Am John") ;
});

app.listen(3000, () => {
  console.log("listening!") ;
}) ;

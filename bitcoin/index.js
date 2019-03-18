//jshint esversion:6
const express = require("express") ;
const bodyParser = require("body-parser") ;
const request = require("request") ;

const app = express() ;

app.use(bodyParser.urlencoded({extended:true})) ;

app.listen(3000, () => {
  console.log("Listening on 3000...") ;
}) ;

app.get("/", (req,res) =>{
   res.sendFile(__dirname+"/index.html") ;
}) ;

app.post("/", (req,res) =>{
   var reqBdy = req.body ;

   console.log(reqBdy.crypto + ":" + reqBdy.fiat) ;
   var url = `https://apiv2.bitcoinaverage.com/indices/global/ticker/${reqBdy.crypto}${reqBdy.fiat}` ;
   console.log(url) ;
   request(url,
     (err,resp,body) => {
      if (res.statusCode == 200) {
        var jsonRep = JSON.parse(body) ;
        console.log(jsonRep);
        res.send("symbol: " + jsonRep.display_symbol + " ask: "+jsonRep.ask + " bid: " +jsonRep.bid) ;
      }

      //console.log("error",err) ;
      //console.log("res", resp) ;
      //console.log("body",body);

   }) ;
    // res.send(reqBdy.crypto + ":" + reqBdy.fiat) ;
    // res.send(req.body.crypto + ":" + req.body.fiat) ;
}) ;

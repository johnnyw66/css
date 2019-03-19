//jshint esversion:6
const express = require("express") ;
const bodyParser = require("body-parser") ;
const request = require("request") ;
const baseAPIURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker" ;

const app = express() ;

app.use(bodyParser.urlencoded({extended:true})) ;

app.listen(3000, () => {
  console.log("Listening on 3000...") ;
}) ;

app.get("/", (req,res) =>{
   res.sendFile(__dirname+"/index.html") ;
}) ;

app.get("/quote", (req,res) =>{
   res.sendFile(__dirname+"/quote.html") ;
}) ;


app.post("/quote", (req,res) => {

  let crypto = req.body.crypto ;
  let currency = req.body.fiat ;
  let amount = Number(req.body.amount) ;
  var baseAPIURLConvert = "https://apiv2.bitcoinaverage.com/convert" ;

  var parameterQuery = {
    from: crypto,
    to: currency,
    amount: amount,
  } ;

  console.log(req.body) ;

  var query = {
    url:"/global",
    baseUrl: baseAPIURLConvert,  // GET baseUrl + url
    method: "GET",
    qs: parameterQuery,
    headers: {}
  }

  request(query,(error,response,body)=>{

    console.log(body) ;
    var ourResponse = {
        query: parameterQuery,
        response: JSON.parse(body)
    } ;
    res.writeHead(200,{"Content-Type": "application/json"}) ;
    res.write(JSON.stringify(ourResponse)) ;
    res.end() ;
  });

}) ;
app.post("/", (req,res) =>{

   let crypto = req.body.crypto ;
   let currency = req.body.fiat ;

   var url = `${baseAPIURL}/${crypto}${currency}` ;

   console.log(url) ;
   request(url,
     (err,resp,body) => {

      var serviceResponse  = {} ;

      if (res.statusCode === 200) {

        var jsonRep = JSON.parse(body) ;
        console.log(jsonRep);

        serviceResponse = {
            timestamp: jsonRep.display_timestamp,
            crypto: crypto,
            currency: currency,
            value: jsonRep.last,
            response:200
        } ;

      } else {
        serviceResponse = {
            response:500
        } ;
      }
      res.writeHead(200, {"Content-Type": "application/json"});
      res.write(JSON.stringify(serviceResponse)) ;
      res.end() ;

   }) ;

}) ;

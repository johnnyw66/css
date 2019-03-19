//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const fs = require('file-system');

const app = express();
const chimpAPIKey = "fb2b64ade7eb7c426869ddeee11a7181-us20" ;
const chimpListId = "4767b93980" ;
const chimpAPIbaseUrl = "https://us20.api.mailchimp.com/3.0/lists" ;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));




function sendFile(respond, resource, altResource) {
  console.log("Requesting " + resource);

  fs.stat(resource, (err) => {
    console.log(resource, "stat error = ", err);
    if (err) {
      if (altResource != null) {
        respond.sendFile(altResource);
      } else {
        respond.send();
      }
    } else {
      respond.sendFile(resource);
    }
  });

}


app.listen(3000, () => {
  console.log("Listening on 3000...");
});


app.post("/signup", (req, res) => {
  var bodyForm = req.body;
  console.log(bodyForm);

  var firstName = bodyForm.firstName;
  var lastName = bodyForm.lastName;
  var firstName = bodyForm.email;
  var options = {
    url: "/" + chimpListId,
    baseUrl: chimpAPIbaseUrl,


  } ;
  response(options,(error,request,body) => {


  });
  res.send("OK");
});

app.get("/list", (req, res) => {

  console.log("attempting to list chimps");

  var options = {
    uri: "/" + "members",
    baseUrl: chimpAPIbaseUrl + "/" + chimpListId,
    method: "GET",
    headers: {

      // "Content-Type": "application/json",
      "Authorization" : "johnny " + chimpAPIKey
    },
    // data: { anystring: chimpAPIKey}

  } ;

  console.log(options) ;

  request(options,(error,response,body) => {
    if (error) {
      console.log("Error") ;
    } else {

    }
    console.log(response.statusCode) ;
    console.log(response) ;
    var ourResponse = JSON.parse(body) ;

    res.writeHead(200,{"Content-Type": "application/json"}) ;
    res.write(JSON.stringify(ourResponse)) ;
    res.end() ;
  });

});



app.get(["/", "*.html"], (req, res) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>> " + req.originalUrl);
  var uriResource = __dirname + req.originalUrl;
  var defaultResource = __dirname + "/signup.html"
  sendFile(res, uriResource, defaultResource);
});

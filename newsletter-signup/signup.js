//jshint esversion:6

/*
module.exports = {
  chimpAPIKey: dxxxxxxxxxxxxxxxxxxxxxxxxxxxx64fa-us20
};

*/

const secrets = require("./secrets.js")
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const fs = require('file-system');

const app = express();

const chimpListId = "4767b93980" ;
const chimpAPIbaseUrl = "https://us20.api.mailchimp.com/3.0/lists" ;
const chimpAPIKey = secrets.chimpAPIKey;


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
  console.log("Listening on 3000..." + chimpAPIKey);
});


app.post("/signup", (req, res) => {
  var bodyForm = req.body;
  console.log(bodyForm);

  var firstName = bodyForm.firstName;
  var lastName = bodyForm.lastName;
  var email = bodyForm.email;

  var data = {
    update_existing:true,
    members: [
          {
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName
            },

           }
    ]
  } ;

  var jsonData = JSON.stringify(data) ;
  console.log(jsonData) ;

  var options = {
    uri: "/" ,
    baseUrl: chimpAPIbaseUrl + "/" + chimpListId,
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      "Authorization" : "johnny " + chimpAPIKey
    },
    body: jsonData

  } ;

  request(options,(error,response,body) => {
    if (error) {
      console.log("Error") ;
    } else {

    }
    // console.log(response.statusCode) ;
    // console.log(response) ;
    var ourResponse = JSON.parse(body) ;

    res.writeHead(200,{"Content-Type": "application/json"}) ;
    res.write(JSON.stringify(ourResponse)) ;
    res.end() ;
  });

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

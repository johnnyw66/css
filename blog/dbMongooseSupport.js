//jshint esversion:6


// New Mongo/Mongoose support for persistent data
const ld = require("lodash") ;

const remoteDB = _buildSecureLink("mongodb+srv://admin-johnny:<PASSWORD>@clusterjohnny-m6nxe.mongodb.net/blogDB?retryWrites=true") ;
const localDB = "mongodb://localhost:27017/blogDB" ;
const useDB = localDB ;

const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

// Schema
const userSchema = new mongoose.Schema( {
	title: {type: String },
	firstName: {type: String, required: true },
	lastName: {type: String, required: true },
	email: {type: String, required: true, unique: true },
	password: {type: String, required: [true,'Password needed'] },
	oAuthKey: {type: String},
	lastLoggedOn: {type: String}
})

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'REQUIRED, mate!']},
  body: { type: String },
  // owner: {type: userSchema}
 });

// Models
const BlogItem = mongoose.model('BlogItem', blogSchema);

const User = mongoose.model('User', userSchema);

mongoose.connect(useDB, {
  useNewUrlParser: true
}).catch((e)=> {
  console.log("Error with Mongoose connection", e.message) ;
}) ;



// Returns a Promise to Add a NEW Entry to a named list
 exports.addPost =  (title, body, id) => {

  console.log("add title = ", title);
  console.log("add body = ", body);
  console.log("id = ", id);

  return new BlogItem({title: title, body: body}).save();

}

// Returns a Promise to return a list of items - from a given named toToList

exports.getPostFromTitle = (title) => {
  return BlogItem.findOne({title: title }) ;
}

exports.getPostFromId = (id) => {
	console.log("getPostFromId",id) ;
  return BlogItem.findById(id) ;
}

exports.getAllPosts = () => {
  return BlogItem.find() ;
}


function _trim(str) {
  return ld.replace(str,new RegExp("[_ ,-]","g"),"").toLowerCase() ;
}


// Not Production Code!
function _buildSecureLink(str) {
  var lines = require('fs').readFileSync(".password.in", 'utf-8')
      .split('\n')
      .filter(Boolean);
  console.log("<<<<<<<_buildSecureLink>>>>>>",lines[0]) ;
  return str.replace("<PASSWORD>", lines[0]) ;
}

//jshint esversion:6


// New Mongo/Mongoose support for persistent data
const ld = require("lodash") ;

const remoteDB = _buildSecureLink("mongodb+srv://admin-johnny:<PASSWORD>@clusterjohnny-m6nxe.mongodb.net/wikiDB?retryWrites=true") ;
const localDB = "mongodb://localhost:27017/wikiDB" ;
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

const articleSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'REQUIRED, mate!']},
  content: { type: String },
  // owner: {type: userSchema}
 });

// Models
const Article = mongoose.model('Article', articleSchema);
const User = mongoose.model('User', userSchema);

mongoose.connect(useDB, {
  useNewUrlParser: true
}).catch((e)=> {
  console.log("Error with Mongoose connection", e.message) ;
}) ;



// Returns a Promise to Add a NEW Entry to a named list
 exports.addPost =  (title, content) => {

  console.log("add title = ", title);
  console.log("add body = ", content);

  return new Article({title: title, content: content}).save();

}

exports.removePost =  (id) => {

 console.log("removePost id = ", id);

 return Article.deleteOne({_id:id}) ;

}

exports.removeAllPosts =  () => {

 return Article.deleteMany() ;

}

exports.updatePost =  (id, title, content) => {

 return Article.update({_id: id},{title: title, content: content},{overwrite: true}) ;

}

exports.patchPost =  (id, patch) => {
 return Article.update({_id: id},{$set: patch}) ;
}

// Returns a Query to return a list of items - from a given named toToList

exports.getArticleFromTitle = (title) => {
  return Article.findOne({title: title }) ;
}

exports.getArticleFromId = (id) => {
	console.log("getArticleFromId",id) ;
  return Article.findById(id) ;
}

exports.getAllArticles = () => {
  return Article.find() ;
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

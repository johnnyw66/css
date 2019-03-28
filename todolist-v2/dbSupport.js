//jshint esversion:6

// module.exports =  {what,formattedDate} ;

// Note: 'exports' is short for module.exports
// Note: '(a,b) =>'  is equiv to 'function(a,b)'

// New Mongo/Mongoose support for persistent data

const remoteDB = _buildSecureLink("mongodb+srv://admin-johnny:<PASSWORD>@clusterjohnny-m6nxe.mongodb.net/toDoDB?retryWrites=true") ;
const localDB = "mongodb://localhost:27017/toDoDB" ;

const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);

mongoose.connect(remoteDB, {
  useNewUrlParser: true
}).catch((e)=> {
  console.log("Error with Mongoose connection", e.message) ;
}) ;



const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'REQUIRED, mate!']
  },
  completed: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    require: [true, 'required mate']
  }
});

const Item = mongoose.model('Item', itemSchema);

// Returns a Promise to Add a NEW Entry to a named list
exports.add = (listname, entry) => {

  console.log("add name = ", listname);
  console.log("add entry = ", entry);

  return Item({title: entry,name: listname}).save();

}

exports.delete = (id) => {
  console.log("delete By Id", id);
  return Item.deleteOne({_id: id}) ;
}



// Returns a Promise to return a list of items - from a given named toToList

exports.getListFromName = (name) => {
  return Item.find({name: name }) ;
}

exports.test = () => {
  console.log("Testing dbSupport");
}


function _buildSecureLink(str) {
  var lines = require('fs').readFileSync(".password.in", 'utf-8')
      .split('\n')
      .filter(Boolean);
  console.log("<<<<<<<_buildSecureLink>>>>>>",lines[0]) ;
  return str.replace("<PASSWORD>", lines[0]) ;
}

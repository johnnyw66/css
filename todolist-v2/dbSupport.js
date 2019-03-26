//jshint esversion:6

// module.exports =  {what,formattedDate} ;

// Note: 'exports' is short for module.exports
// Note: '(a,b) =>'  is equiv to 'function(a,b)'

// New Mongo/Mongoose support for persistent data

const mongoose = require("mongoose");


mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/toDoDB', {
  useNewUrlParser: true
});


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
  console.log("removeToDoById", id);
  return Item.deleteOne({_id: id}) ;
}


// Returns a Promise to return a list of items - from a given named toToList

exports.getListFromName = (name) => {
  return Item.find({name: name }) ;
}

exports.test = () => {
  console.log("Testing dbSupport");
}

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


const toDoSchema = new mongoose.Schema({
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

const ToDo = mongoose.model('ToDo', toDoSchema);


exports.add = (listname, entry) => {

  console.log("add name = ", listname);
  console.log("add entry = ", entry);

  return new Promise((resolved) => {
    const toDo = new ToDo({
      title: entry,
      name: listname
    });
    toDo.save();
    resolved('Added Complete');
  }, (rejected) => {
    rejected('Add Failed');
  });

}

exports.removeToDoById = (id) => {
  console.log("removeToDoById", id);
  ToDo.deleteOne({
    _id: id
  }, (res) => {
    console.log("dbSupport delete one entry ", res);
  });
  return null;
}


exports.getListFromName = (name) => {

  return new Promise((resolved) => {
    ToDo.find({
      name: name
    }, (err, items) => {
      if (err) {
        console.log("ERROR!!!!!", err);

      } else {
        const bldList = [];
        items.forEach((item) => {
          bldList.push(item.title);
        });
        console.log("FINALLY BUILT LIST ", bldList);
        return resolved(bldList);
      }
    });
  }, (rejected) => {
    console.log("REJECTED!!!!!");
  });

}

exports.test = () => {
  console.log("Testing dbSupport");
}

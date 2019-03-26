const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});


const fruitSchema = new mongoose.Schema({
  name: {type: String,unique: true,required: [true,'REQUIRED, mate!']},
  // name: { type: String, unique: true, required: true},
  rating:{ type: Number,min:1, max:10 },
  review: String
}) ;

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
}) ;

const Fruit = mongoose.model('Fruit', fruitSchema);
const Person = mongoose.model('Person',personSchema) ;


const goodApple = new Fruit({ name:'Apple',rating:8, review: "Nice and Red!" });

// goodApple.save().then((err) => console.log('yum',err)).catch((reason)=>{
//     console.log(reason.name) ;
//     console.log(reason.message) ;
// });


const badApple = new Fruit({ name:'Apple',rating:26, review: "Nice and Red!" });

// badApple.save().then((err) => console.log('yum',err)).catch((reason)=>{
//     console.log(reason.name) ;
//     console.log(reason.message) ;
// });

// try {
//   const apple = new Fruit({ name: 'Apple', rating:6, review: "Nice and Red!" });
//   apple.save().then((err) => console.log('yum',err));
// } catch(e) {
//   console.log("Exception",e) ;
// }




const aPerson = new Person({name:'John',age:37}) ;

// aPerson.save().then(()=> console.log("person created")) ;

const someFruits = [
  {
      name: "Kiwi",
      rating: 4,
      review: "Green and good"
  },
  {
      name: "Banana",
      rating: 2,
      review: "Should be Yellow - but was Green and bad"
  },
  {
      name: "Pear",
      rating: 9,
      review: "Juicy Lucy!"
  }

] ;


// Fruit.insertMany(someFruits,(err)=>{console.log(err) ;}) ;

// Fruit.find((err,fruits)=>{
//   if (err) {
//     console.log(err) ;
//   } else {
//     console.log(fruits) ;
//   }
// }) ;
// Fruit.updateOne({name:"Pear"},{rating: 5,review:'Sucks'},(res)=>{
//   console.log("result", res)
// });
//
// Fruit.deleteOne({name:"Pear"},(res)=> {
//     console.log("deleteOne result",res) ;
// }) ;
//
// Fruit.deleteOne({_id:"5c99d985d9618c18a00010dc"},(res)=> {
//     console.log("deleteOne result",res) ;
// }) ;
//
Fruit.find({name: "Apple"},(err,fruits) => {
  console.log(fruits) ;
  if (!err) {
    fruits.forEach((fruit)=>{
      console.log(fruit.name,fruit.rating) ;
    })
  }
}) ;

// console.log("list - all ");
// Fruit.find((err,someFruit) => console.log(someFruit)) ;

// Person.deleteMany({name:"John"},(err)=>{
//   console.log("Delete Many",err) ;
// }) ;


Fruit.find({name: "Apple"},(err,fruits) => {
  console.log(fruits) ;
  if (!err) {
    fruits.forEach((fruit)=>{
      console.log(fruit.name,fruit.rating) ;
      console.log("Attempting to updatePerson to have a favouriteFruit");

      Person.updateMany({name:"John"},{favouriteFruit:fruit},(err)=>{
        console.log("Update Many",err) ;
      }) ;

    })
  }
}) ;

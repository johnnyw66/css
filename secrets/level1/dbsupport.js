//jshint esversion:6
const md5 = require('md5') ;
const bcrypt = require('bcrypt') ;
const saltRounds = 10 ;
const baseSalt = process.env.SECRET ;

const mongoose = require('mongoose') ;
const encrypt = require('mongoose-encryption') ;

const remoteDB = "mongodb://localhost:27017/secretsDB" ;
const localDB  = "mongodb://localhost:27017/secretsDB" ;


mongoose.connect(localDB,{useNewUrlParser:true}) ;
mongoose.set('useCreateIndex', true);


const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required:true}
}) ;

console.log("Encryption Secret",baseSalt) ;

console.log("Check",bcrypt.hashSync("hello", saltRounds)) ;

userSchema.plugin(encrypt, {secret: process.env.SECRET , encryptedFields: ['XXXXXpassword']})

const User =  new mongoose.model('User',userSchema) ;


exports.register = (email,password) => {

  return bcrypt.hash(baseSalt + password + email,saltRounds)
  .then((hashedPassword) =>{
    return new User({email: email, password: hashedPassword}).save() ;
  }) ;

}


exports.checkCredentials = (email,password) => {

  return User.findOne({email: email})
  .then((user) => {
    return bcrypt.compare(baseSalt + password + email,user.password)
  })  ;

}


exports.retrieveAuthenticatedUser = (email,password) => {

  return User.findOne({email: email})
  .then((user) => {
    console.log("findOne - then. USER = ",user) ;
    if (!user) {
      return Promise.reject('NO USER FOUND') ;
    }
    return bcrypt.compare(baseSalt + password + user.email, user.password)
    .then((res)=>{
      if (res) {
        return Promise.resolve(user) ;
      } else {
        return Promise.reject('PASSWORD BAD') ;
      }
    })}) ;
}

//jshint esversion:6


const ld = require("lodash") ;

const posts = [] ;

exports.addPost = (postTitle,postBody) => {

  console.log("addPost : " + postTitle) ;

  return new Promise((resolved,rejected) => {
      posts.push({title: postTitle, body:postBody, id: posts.length}) ;
      resolved(posts) ;
    }) ;

}

// At some point our Id is going to be a unique string and our array is going to
// be a row in a database
exports.getPostFromId = (id) => {
  return new Promise((resolved,rejected) => {
      resolved(posts[Number(id)]) ;
    }) ;
}


exports.getAllPosts = ()=> {
  return new Promise((resolved,rejected) => {
      resolved(posts) ;
    }) ;
}


function _trim(str) {
  return ld.replace(str,new RegExp("[_ ,-]","g"),"").toLowerCase() ;
}

exports.findByTitle = (title) => {
  const trimmedTitle = _trim(title) ;
  // console.log(trimmedTitle) ;

  for(let post of posts) {
    if (_trim(post.title) === trimmedTitle) {
      return new Promise((resolved,rejected) => {
          resolved(post) ;
        }) ;

    }
  }

  return new Promise((resolved,rejected) => {
      rejected() ;
    }) ;
}

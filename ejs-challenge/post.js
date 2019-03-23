//jshint esversion:6


// Note: 'exports' is short for module.exports
// Note: '(a,b) =>'  is equiv to 'function(a,b)'

const ld = require("lodash") ;

const posts = [] ;


exports.addPost = (postTitle,postBody) => {
  console.log("addPost : " + postTitle) ;
  posts.push({postTitle: postTitle, postText:postBody, id: posts.length}) ;
}

// At some point our Id is going to be a unique string and our array is going to
// be a row in a database
exports.getPostFromId = (id) => {
  return posts[Number(id)] ;
}


exports.getAllPosts = ()=> {
    return posts ;
}



function _trim(str) {
  return ld.replace(str,new RegExp("[_ ,-]","g"),"").toLowerCase() ;
}

exports.findByTitle = (title) => {
  const trimmedTitle = _trim(title) ;
  // console.log(trimmedTitle) ;

  for(let post of posts) {
    if (_trim(post.postTitle) === trimmedTitle) {
      return post ;
    }
  }
  return undefined ;
}


// Render Support

exports.renderPostedContent = ()=> {
  return posts.map( (post) => {
      return "<div class='post'><a href='/post?" + post.id + "'<p>" + post.postTitle + "</a> : " + post.postText + "</p></div>" ;
  }).join(" ") ;
}

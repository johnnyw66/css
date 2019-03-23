//jshint esversion:6


// Note: 'exports' is short for module.exports
// Note: '(a,b) =>'  is equiv to 'function(a,b)'

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

// Render Support

exports.renderPostedContent = ()=> {
  return posts.map( (post) => {
      return "<div class='post'><a href='/post?" + post.id + "'<p>" + post.postTitle + "</a> : " + post.postText + "</p></div>" ;
  }).join(" ") ;
}

exports.getAllPosts = ()=> {
    return posts ;
}

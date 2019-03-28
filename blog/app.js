//jshint esversion:6

const homeStartingContent = "HOME Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "ABOUT Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "CONTACT Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const composeContent = "COMPOSE Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const postContent = "POST Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const errorContent = "404! ERROR Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const dbSupport = require(__dirname + '/dbMongooseSupport.js')
// const dbSupport= require(__dirname + '/dbArraySupport.js')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});



app.get("/", (req,res) => {

    const postedContent = '' ; //post.renderPostedContent() ;
    dbSupport.getAllPosts().then((posts)=>{
      const view = {content: homeStartingContent,postContent: postedContent, posts:posts};
      res.render("home",view) ;
    }) ;

} ) ;

app.get("/about", (req,res) => {
    res.render("about",{content: aboutContent}) ;
} ) ;

app.get("/contact", (req,res) => {
    res.render("contact",{content: contactContent}) ;
} ) ;


app.get("/compose", (req,res) => {
    res.render("compose",{content: composeContent}) ;
} ) ;

app.post("/compose", (req,res) => {

    const {postText} = req.body ;
    const {postTitle} = req.body ;

    dbSupport.addPost(postTitle,postText)
    .then((posts)=>{
      res.redirect("/") ;
    })
    .catch((err)=>{
      res.redirect("/") ;
    }) ;



} ) ;

app.get("/post/:query", (req,res) => {

  const {query} = req.params ;

  dbSupport.getPostFromId(query).then((blog)=>{
    console.log("getPostFromId",blog) ;
    renderBlog(res,blog) ;
  }).catch((err)=>{
    console.log("ERROR",err)
  }) ;

} ) ;

app.get("/title/:query", (req,res) => {

  const {query} = req.params ;

  dbSupport.findByTitle(query).then((blog)=>{
    renderBlog(res,blog) ;
  }).catch((err)=>{

  }) ;

}) ;




// Support functions

function renderBlog(res,blog) {

  if (blog === undefined) {
    res.render("error",{content: errorContent}) ;
  } else {
    res.render("post",{
                        content: postContent,
                        title: blog.title,
                        post: blog.body
                     }) ;
  }
}

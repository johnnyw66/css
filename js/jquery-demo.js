function buildButton(title) {
  return `<button>${title}</button>`;
}


$(document).ready(function(){

  var currentColour = $("h1").css("color") ;
  var fontSize = $("h1").css("font-size")

  // $("h1").css("font-size","5rem") ;

  // $("h1").classes() ;

  // prepend/append/before/after

  $("h1").before(buildButton("before"))
  $("h1").prepend(buildButton("prepend"))
  $("h1").append(buildButton("append"))
  $("h1").after(buildButton("after"))

  console.log(currentColour) ;

  $("img").attr("src","images/dice" + (Math.floor(Math.random() * 6 + 1)) + ".png") ;

  $("a").attr("href","http://yahoo.co.uk")
  $("a").on("mouseenter",{data:"Hello World"},function(ev) {
      console.log(ev)
  }) ;

  $(document).on("mouseover",{data:"Hello World"},function(ev) {
      console.log(ev)
      $(ev.target).css("color","red");

  }) ;

/*

  $("h1").css("color","red") ;
  $("h1").css("color",currentColour) ;
*/
  $("h1").hasClass("big-title") ;

  $("h1").addClass("big-title") ;

  $(".buttons button").text("CLICK ME") ;

  setTimeout(function () {
    $(".buttons button").remove() ;

  }, 4000);

  $(".single-button button").hide() ;

  $(".single-button button").html("<em>SINGLE BUTTON</em>") ;


  // Passing parameter to click Event handler.
  $("button").click(
    {myparam:"hello world!"},
    function(ev){
      console.log(ev,ev.data.myparam);
      //$("img").fadeToggle() ;  // FadeUp FadeDown
      $("img").slideToggle(3000) ;  // slideUp, SlideDown

    }) ;


  // var classLst = $("button").class() ;

  // console.log(classLst) ;

  $(document).keypress(function(evt){
    console.log(evt);
    $("h1").html(evt.key);
  }) ;


}) ;

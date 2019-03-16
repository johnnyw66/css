function buttonAnimationKey(key) {
    var chElement = document.querySelector(".drum." + key) ;
    var pressedElement = document.querySelector(".pressed") ;

    if (chElement != null && pressedElement == null) {
      chElement.classList.add("pressed") ;

      setTimeout(function(key){

          console.log("Drum Animation off " + key) ;
          var chElement = document.querySelector(".drum." + key) ;
          if (chElement != null) {
            chElement.classList.remove("pressed") ;
          }
      },400,key)
    }

}
function playAudioAsset(key) {
  var audioAsset;

  switch (key.toLowerCase()) {
    case 'w':
      audioAsset = "sounds/tom-1.mp3";
      break;
    case 'a':
      audioAsset = "sounds/tom-2.mp3";
      break;
    case 's':
      audioAsset = "sounds/tom-3.mp3";
      break;
    case 'd':
      audioAsset = "sounds/tom-4.mp3";
      break;
    case 'j':
      audioAsset = "sounds/snare.mp3";
      break;
    case 'k':
      audioAsset = "sounds/kick-bass.mp3";
      break;
    case 'l':
      audioAsset = "sounds/crash.mp3";
      break;
    default:
      break;
  }
  if (typeof(audioAsset) != 'undefined') {

    buttonAnimationKey(key);

    var audio = new Audio(audioAsset);
    audio.play();
  }
}

function initCallBacks() {

  // initialise one callback for clicking on drum icons.

  for (let button of document.querySelectorAll(".drum")) {

    button.addEventListener("click",
      function() {
        var clst = this.classList;
        var audioAsset;

        // we are only allowing to play one sound at a time!
        //
        if (clst.contains('w')) {
          playAudioAsset('w') ;

        } else if (clst.contains('a')) {
          playAudioAsset('a') ;

        } else if (clst.contains('s')) {
          playAudioAsset('s') ;

        } else if (clst.contains('d')) {
          playAudioAsset('d') ;

        } else if (clst.contains('j')) {
          playAudioAsset('j') ;

        } else if (clst.contains('k')) {
          playAudioAsset('k') ;

        } else if (clst.contains('l')) {
          playAudioAsset('l') ;

        }


      }
    );
    this.addEventListener("keydown", function(evt) {
      // console.log(evt);
      playAudioAsset(evt.key) ;
    })

  }

}

function audioPlay() {
  audioAsset = "sounds/crash.mp3";
  var audio = new Audio(audioAsset);
  audio.play();
}

window.onload = function() {
  initCallBacks();

};

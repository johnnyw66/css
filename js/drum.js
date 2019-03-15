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
window.onload = function() {
  initCallBacks();
};

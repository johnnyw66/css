
function initCallBacks() {

  // initialise one callback for clicking on drum icons.

  for (let button of document.querySelectorAll(".drum")) {

    button.addEventListener("click",
      function() {
        var clst = this.classList;
        var audioAsset;

        // we are only allowing to play one sound at a time!

        if (clst.contains('w')) {
          audioAsset = "sounds/tom-1.mp3";
        } else if (clst.contains('a')) {
          audioAsset = "sounds/tom-2.mp3";
        } else if (clst.contains('s')) {
          audioAsset = "sounds/tom-3.mp3";
        } else if (clst.contains('d')) {
          audioAsset = "sounds/tom-4.mp3";
        } else if (clst.contains('j')) {
          audioAsset = "sounds/snare.mp3";
        } else if (clst.contains('k')) {
          audioAsset = "sounds/kick-bass.mp3";
        } else if (clst.contains('l')) {
          audioAsset = "sounds/crash.mp3";
        }

        var audio = new Audio(audioAsset);
        audio.play();


      }
    );
  }

}
window.onload = function() {
  initCallBacks();
};

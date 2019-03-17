
// InGame Message Constants

const GAMESTATUS_GAMESTART = "Press A Key to Start";
const GAMESTATUS_PLAYGAME = "And You Say?";
const GAMESTATUS_GAMEOVER = "Game Over!";
const GAMESTATUS_SIMONSABOUTTOSTART = "Simon's thinking ....";
const GAMESTATUS_SIMONSTURN = "Simon Says ....";

const REFRESH = 500;      // Refresh period (ms)- Lower period == faster game!
                          // NOTE: This should be no lower than 'ANIMATEBUTTON_DURATION'


var currentLevel = 1;
var lights = [];

var state = GAME_STATE_START;
var currentNote = 0;


// Game Starts here

$(document).ready(function() {
  resetGame();
  setInterval(function() {
    update(24);
  }, 24);

});


function defaultBackGroundColourOfHud() {
  $("body").removeClass("game-over simons-thinking simons-turn players-turn game-waiting-to-start") ;
}

function changeBackGroundColourOfHud(newClass) {
  $("body").removeClass("game-over simons-thinking simons-turn players-turn game-waiting-to-start").addClass(newClass) ;
}

function animateLight(colour) {
  $(".btn." + colour).addClass("pressed");
  setTimeout(function(colour) {
    $(".btn." + colour).removeClass("pressed");
  }, ANIMATEBUTTON_DURATION, colour)

}

function setHudMessage(message) {
  $("#hud-info").text(message);
}

function setGameStatusMessage(message) {
  $("#level-title").text(message);
}

function enableWaitForKeyOrMouseEvent() {

  $(document).on("click keydown", function(ev) {
    changeState(GAME_STATE_PAUSE_BEFORE_SIMON);
  });
}
// enable and bind 4 game buttons
function enablePlayButtons() {
  $(".btn.red").click(function(ev) {
    playAndCheckAnimateLight(0);
  });
  $(".btn.green").click(function(ev) {
    playAndCheckAnimateLight(1);

  });
  $(".btn.blue").click(function(ev) {
    playAndCheckAnimateLight(2);
  });
  $(".btn.yellow").click(function(ev) {
    playAndCheckAnimateLight(3);

  });
}

// display 4 player buttons
function disablePlayButtons() {
  $(document).unbind("click keydown");
  $(".btn").unbind("click");

}




function resetGame() {
  qStates =  [] ;
  lights = [];
  gameRefreshPeriod = REFRESH ;
  currentLevel = 1;
  time = 0;
  animation = [{
      block: "red",
      audio: "sounds/red.mp3"
    },
    {
      block: "green",
      audio: "sounds/green.mp3"
    },
    {
      block: "blue",
      audio: "sounds/blue.mp3"
    },
    {
      block: "yellow",
      audio: "sounds/yellow.mp3"
    },
    {
      block: "fail",
      audio: "sounds/wrong.mp3"
    },

  ];
  for (let i = 0; i < MAXROUNDS; i++) {
    lights.push(pickARandomLight());
  }
  changeState(GAME_STATE_WAITFORSTARTKEY);
}

function playSound(assetName) {
    var audio = new Audio(assetName);
    audio.play();
}



function playAndCheckAnimateLight(light) {

  playAndAnimateLight(light);
  if (lights[currentNote] != light) {
    // Fail!!
    console.log("FAIL!!!! END GAME");
    playAndAnimateLight(4);
    changeStateAfterDelay(GAME_STATE_ENDINGGAME);
  } else {
    console.log("CORRECT  NOTE SO FAR - BUMP TO NEXT NOTE");

    // Bump current note and check if we have successfully completed a round
    if (++currentNote == currentLevel) {
      console.log("COMPLETED ALL NOTES BUMP NEXT LEVEL  - AND GO BACK TO SIMON");

      // Bump up to next level and check if we have finished

      if (++currentLevel <= MAXROUNDS) {

        changeGameSpeed() ;   // Change Game Speed on New Level.

        changeStateAfterDelay(GAME_STATE_PAUSE_BEFORE_SIMON);

      } else {

        console.log("YOU WIN!!!! END GAME");
        playAndAnimateLight(4);
        changeStateAfterDelay(GAME_STATE_ENDINGGAME);

      }
    } else {
      console.log("OK NEXT NOTE PLEASE>>>>>>>>>");
    }
  }
}


function playAndAnimateLight(light) {

  playSound(animation[light].audio);
  animateLight(animation[light].block);
}

function pickARandomLight() {
  return Math.floor(Math.random() * 4);
}


function setGameOverMessage() {
  setGameStatusMessage(GAMESTATUS_GAMEOVER) ;
}

function setPlayersTurnMessage() {
  setGameStatusMessage(GAMESTATUS_PLAYGAME) ;
}

function setSimonAboutToStartMessage() {
  setGameStatusMessage(GAMESTATUS_SIMONSABOUTTOSTART) ;
}

function setSimonsTurnMessage() {
  setGameStatusMessage(GAMESTATUS_SIMONSTURN) ;

}

function setClickToStartMessage() {
    setGameStatusMessage(GAMESTATUS_GAMESTART) ;
}

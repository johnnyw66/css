const GAMESTATUS_GAMESTART = "Press A Key to Start";
const GAMESTATUS_PLAYGAME = "Play Game";
const GAMESTATUS_GAMEOVER = "Game Over, Press Any Key To Restart";
const GAMESTATUS_XXXX = "Game Over, Press Any Key To Restart";

const GAME_STATE_START = 0;

const GAME_STATE_WAITFORSTARTKEY = 1;
const GAME_STATE_PAUSE_BEFORE_SIMON = 2;
const GAME_STATE_PLAYGAME_SIMONSAYS = 3;
const GAME_STATE_PLAYGAME_PLAYERSAYS = 4;

const GAME_STATE_ENDINGGAME = 5;
const GAME_STATE_ENDGAME = 6;
const MAXROUNDS = 32;
const REFRESH = 500;

const ANIMATEBUTTON_DURATION = 200 ;
const PAUSE_BEFORE_SIMONSAYS = 2500;
const PAUSE_BEFORE_ENDGAME = 4500;


var currentLevel = 1;
var lights = [];
var state = GAME_STATE_START;
var currentNote = 0;
var qstates = [];
var time = 0;
var timeFinishState = 0;


function stateString(state) {
  switch (state) {

    case GAME_STATE_START:
      return "GAME_STATE_START";

    case GAME_STATE_WAITFORSTARTKEY:
      return "GAME_STATE_WAITFORSTARTKEY";

    case GAME_STATE_PAUSE_BEFORE_SIMON:
      return "GAME_STATE_PAUSE_BEFORE_SIMON";

    case GAME_STATE_PLAYGAME_SIMONSAYS:
      return "GAME_STATE_PLAYGAME_SIMONSAYS";

    case GAME_STATE_PLAYGAME_PLAYERSAYS:
      return "GAME_STATE_PLAYGAME_PLAYERSAYS";

    case GAME_STATE_ENDINGGAME:
      return "GAME_STATE_ENDINGGAME";

    case GAME_STATE_ENDGAME:
      return "GAME_STATE_ENDGAME";

    default:
      return "UNKNOWN STATE";

  }
}

function leaveState(state) {
  console.log("leaveState " + stateString(state));

  // leave currentstate
  switch (state) {
    case GAME_STATE_WAITFORSTARTKEY:
      break;
    case GAME_STATE_PAUSE_BEFORE_SIMON:
      break;
    case GAME_STATE_PLAYGAME_SIMONSAYS:
      break;
    case GAME_STATE_PLAYGAME_PLAYERSAYS:
      disablePlayButtons();
      break;
    default:
      disablePlayButtons();
      break;
  }
}

function enterState(state) {
  console.log("enterState " + stateString(state));

  switch (state) {

    case GAME_STATE_WAITFORSTARTKEY:
      disablePlayButtons();
      $(document).on("click keydown", function(ev) {
        changeState(GAME_STATE_PAUSE_BEFORE_SIMON);
      });
      break;

    case GAME_STATE_PAUSE_BEFORE_SIMON:
      timeFinishState = time + PAUSE_BEFORE_SIMONSAYS;
      break;

    case GAME_STATE_PLAYGAME_SIMONSAYS:
      currentNote = 0;
      break;

    case GAME_STATE_PLAYGAME_PLAYERSAYS:
      currentNote = 0;
      enablePlayButtons();
      break;

    case GAME_STATE_ENDINGGAME:
      timeFinishState = time + PAUSE_BEFORE_ENDGAME;
      break;

    case GAME_STATE_ENDGAME:
      break;

    default:
      break;
  }
}

function changeState(newState) {

  let oldState = state;

  leaveState(oldState);
  state = newState;
  enterState(newState);


}

function resetGame() {
  lights = [];
  qstates = [];

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

function animateLight(colour) {
  $(".btn." + colour).addClass("pressed");
  setTimeout(function(colour) {
    $(".btn." + colour).removeClass("pressed");
  }, ANIMATEBUTTON_DURATION, colour)

}

function playAndCheckAnimateLight(light) {
  playAndAnimateLight(light);
  if (lights[currentNote] != light) {
    // Fail!!
    console.log("FAIL!!!! END GAME");
    playAndAnimateLight(4);
    changeState(GAME_STATE_ENDINGGAME);
  } else {
    console.log("CORRECT  NOTE SO FAR - BUMP TO NEXT NOTE");
    currentNote++;
    if (currentNote == currentLevel) {
      console.log("COMPLETED ALL NOTES - BACK TO SIMON");
      currentLevel++; // Next Level
      changeState(GAME_STATE_PAUSE_BEFORE_SIMON);
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

function setGameStatusMessage(message) {
  $("#level-title").text(message);
}


function queueChangeState(queueState) {
  changeState(queueState);
  //qstates.unshift(queueState) ;
}

function update(dt) {
  time += dt;
  console.log("Update time = " + time + " currentState " + stateString(state) + " currentNote " + currentNote + " currentLevel " + currentLevel);
  if (qstates.length > 0) {
    console.log("Popping off new State!");
    changeState(qstates.pop());
  }

  switch (state) {
    case GAME_STATE_START:
      break;

    case GAME_STATE_WAITFORSTARTKEY:
      break;

    case GAME_STATE_PAUSE_BEFORE_SIMON:
      if (time > timeFinishState) {
        changeState(GAME_STATE_PLAYGAME_SIMONSAYS);
      }
      break;

    case GAME_STATE_PLAYGAME_SIMONSAYS:
      console.log("SIMON PLAYS " + currentNote);
      playAndAnimateLight(lights[currentNote++]);
      if (currentNote == currentLevel) {
        changeState(GAME_STATE_PLAYGAME_PLAYERSAYS);
      }
      break;

    case GAME_STATE_PLAYGAME_PLAYERSAYS:
      break;

    case GAME_STATE_ENDINGGAME:
      if (time > timeFinishState) {
        playAndAnimateLight(0);
        playAndAnimateLight(1);
        playAndAnimateLight(2);
        playAndAnimateLight(3);
        changeState(GAME_STATE_ENDGAME);
      }
      break;
    case GAME_STATE_ENDGAME:
      resetGame();
      changeState(GAME_STATE_PAUSE_BEFORE_SIMON);
      break;
  }

}

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

function disablePlayButtons() {
  $(document).unbind("click");
  $(".btn").unbind("click");

}

$(document).ready(function() {

  resetGame();
  setInterval(function() {
    update(REFRESH);
  }, REFRESH);

  //console.log(ply) ;
});

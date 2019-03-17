// jshint esversion:6
// InGame Message Constants

const GAMESTATUS_GAMESTART = "Press A Key to Start";
const GAMESTATUS_PLAYGAME = "And You Say?";
const GAMESTATUS_GAMEOVER = "Game Over!";
const GAMESTATUS_SIMONSABOUTTOSTART = "Simon's thinking ....";
const GAMESTATUS_SIMONSTURN = "Simon Says ....";

// Game State Constants
const GAME_STATE_START = 0;
const GAME_STATE_WAITFORSTARTKEY = 1;
const GAME_STATE_PAUSE_BEFORE_SIMON = 2;
const GAME_STATE_PLAYGAME_SIMONSAYS = 3;
const GAME_STATE_PLAYGAME_PLAYERSAYS = 4;
const GAME_STATE_ENDINGGAME = 5;
const GAME_STATE_ENDGAME = 6;
const GAME_STATE_PAUSE = 7;


// InGame durations in milli-seconds
const ANIMATEBUTTON_DURATION = 200 ;      // Duration for flashing lights
const PAUSE_BEFORE_SIMONSAYS = 2500;      // Pause before Simon say's
const PAUSE_BEFORE_ENDGAME = 4500;        // Pause at the end of a game
const DELAY_BEFORE_SIMON_PLAYS_SINGLE_NOTE = 1000 ; // Single Note Game variation -
const SLIGHT_PAUSE= 1000 ;        // Slight Pause between States - Useful for Single Note Game.
const AI_PLAYER_DELAY= 500 ;        // ai-player delay


const REFRESH = 300;      // Refresh period (ms)- Lower period == faster game!
                          // NOTE: This should be no lower than 'ANIMATEBUTTON_DURATION'

const MAXROUNDS = 3;

const aiPlayer  =   false ;

var simonPlaysOnlyNewNote = false ;  // We can play one of two variants of the game - single note or recite whole sequence.


var currentLevel = 1;
var lights = [];
var qStates = [];
var animation  = {
  red: {block:"red", audio:"sounds/red.mp3"},
  green: {block:"green", audio:"sounds/green.mp3"},
  blue: {block:"blue", audio:"sounds/blue.mp3"},
  yellow: {block:"yellow", audio:"sounds/yellow.mp3"},
  wrong: {block:"none", audio:"sounds/wrong.mp3"},
  win: {block:"none", audio:"sounds/wrong.mp3"}
 } ;


var state = GAME_STATE_START;
var currentNote = 0;
var time = 0;
var timeFinishState = 0;
var gameRefreshPeriod = REFRESH ;


// Game Starts here

$(document).ready(function() {
  setUpGameType() ;
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
  }, ANIMATEBUTTON_DURATION, colour) ;

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

// Enable and bind 4 game buttons

function enablePlayButtons() {
  $(".btn").click(function(ev) {
    var colour = ev.target.id ;
    playAndCheckAnimateLight(colour);

  });

}

// Disable 4 player buttons
function disablePlayButtons() {
  $(document).unbind("click keydown");
  $(".btn").unbind("click");

}


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

    case GAME_STATE_PAUSE:
      return "GAME_STATE_PAUSE";

    default:
      return "UNKNOWN STATE";

  }
}


function leaveState(state) {
  console.log("leaveState " + stateString(state));
  // leave currentstate
  switch (state) {
    case GAME_STATE_PAUSE:
      break;
    case GAME_STATE_WAITFORSTARTKEY:
      break;
    case GAME_STATE_PAUSE_BEFORE_SIMON:
      break;
    case GAME_STATE_PLAYGAME_SIMONSAYS:
      break;
    case GAME_STATE_PLAYGAME_PLAYERSAYS:
      break;
    default:
      break;
  }
}

function enterState(state) {
  console.log("enterState " + stateString(state));

  switch (state) {

    case GAME_STATE_PAUSE:
      disablePlayButtons();             // disable all button presses - allow click and keypress
      timeFinishState = time + SLIGHT_PAUSE;
      break;

    case GAME_STATE_WAITFORSTARTKEY:
      disablePlayButtons();             // disable all button presses - allow click and keypress
      enableWaitForKeyOrMouseEvent() ;

      changeBackGroundColourOfHud("game-waiting-to-start") ;
      setClickToStartMessage() ;
      break;

    case GAME_STATE_PAUSE_BEFORE_SIMON:
      disablePlayButtons();             // disable all button presses


      timeFinishState = time + PAUSE_BEFORE_SIMONSAYS;
      changeBackGroundColourOfHud("simons-thinking") ;
      setSimonAboutToStartMessage() ;
      break;

    case GAME_STATE_PLAYGAME_SIMONSAYS:
      disablePlayButtons() ;

      if (simonPlaysOnlyNewNote) {
        timeFinishState = time + DELAY_BEFORE_SIMON_PLAYS_SINGLE_NOTE;
      }

      currentNote = 0;
      changeBackGroundColourOfHud("simons-turn") ;
      setSimonsTurnMessage() ;      // display message with current level
      break;

    case GAME_STATE_PLAYGAME_PLAYERSAYS:
      currentNote = 0;
      timeFinishState = time + 1000 ;   // Slight pause - (for aiPlayer)
      enablePlayButtons();
      changeBackGroundColourOfHud("players-turn") ;
      setPlayersTurnMessage() ;
      break;

    case GAME_STATE_ENDINGGAME:
      disablePlayButtons() ;
      timeFinishState = time + PAUSE_BEFORE_ENDGAME;
      changeBackGroundColourOfHud("game-over") ;
      setGameOverMessage() ;
      break;

    case GAME_STATE_ENDGAME:
      disablePlayButtons() ;
      break;

    default:
      break;
  }
}

//
function changeStateAfterDelay(newState) {
  // if (qStates.length >= 1) {
  //   var newStateStr = stateString(newState) ;
  //   var stateInWaitingStr = stateString(qStates[0]) ;
  //   throw Error(`qStates[0] = ${stateInWaitingStr} adding ${newStateStr} (len) ` + qStates.length);
  //
  // }
  qStates.push(newState) ;
  changeState(GAME_STATE_PAUSE);

}

function changeState(newState) {

  let oldState = state;

  leaveState(oldState);
  state = newState;
  enterState(newState);


}

function resetGame() {
  qStates =  [] ;
  lights = [];
  gameRefreshPeriod = REFRESH ;
  currentNote = 0 ;
  currentLevel = 1;
  time = 0;

  for (let i = 0; i < MAXROUNDS; i++) {
    lights.push(pickARandomLight());
  }
  changeStateAfterDelay(GAME_STATE_WAITFORSTARTKEY);
}

function playSound(assetName) {
    try {
      console.log("trying to play " + assetName) ;
      // try and play audio
      var audio = new Audio(assetName);
      audio.play();
    } catch(e) {
      console.log("Exeception playing audio " + e.message) ;
    }
}



function playAndCheckAnimateLight(light) {

  playAndAnimateLight(light);
  if (lights[currentNote] != light) {
    // Fail!!
    console.log("FAIL!!!! END GAME");
    playAndAnimateLight("wrong");
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
        playAndAnimateLight("win");
        changeStateAfterDelay(GAME_STATE_ENDINGGAME);

      }
    } else {
      console.log("OK NEXT NOTE PLEASE>>>>>>>>>");
    }
  }
}

// gameRefreshPeriod
function changeGameSpeed() {
  // Reduce gameRefresh Period - based on currentLevel
  // ANIMATEBUTTON_DURATION * 1.25 is our 'base-line'
  // Linear progression from slowest Speed to Fastest Speed based on the
  // player's currentLevel

  var slowSimonRecitalPeriod = REFRESH ;
  var fastSimonRecitalPeriod =  5 * ANIMATEBUTTON_DURATION/4 ;
  var t = currentLevel / MAXROUNDS ;  // t varies from 0 to

  gameRefreshPeriod  = Math.floor(slowSimonRecitalPeriod - (slowSimonRecitalPeriod - fastSimonRecitalPeriod)* t) ;
}

function playAndAnimateAllLights() {
  playAndAnimateLight("red");
  playAndAnimateLight("green");
  playAndAnimateLight("blue");
  playAndAnimateLight("yellow");
}

function playAndAnimateLight(light) {
  console.log("Light " + light + ">>>> " + animation) ;

  playSound(animation[light].audio);
  animateLight(animation[light].block);
}

function pickARandomLight() {
  var colours = ["red","green","blue","yellow"];
  return colours[Math.floor(Math.random() * 4)];
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



function update(dt) {
  time += dt;

  // console.log("Update time = " + time + " currentState " + stateString(state)
  // + " currentNote " + currentNote + " currentLevel " + currentLevel
  // + " simon's speed " + gameRefreshPeriod
  // );
  //
  console.log( "currentState " + stateString(state)
  + " currentNote " + currentNote + " currentLevel " + currentLevel
  + " simon's speed " + gameRefreshPeriod
  );
  setHudMessage("LEVEL " + Math.min(MAXROUNDS,currentLevel)) ;

  switch (state) {

    case GAME_STATE_PAUSE:
      if (time > timeFinishState) {
        if (qStates.length > 0) {
          changeState(qStates.shift());
        }
      }
      break ;

    case GAME_STATE_START:
      break;

    case GAME_STATE_WAITFORSTARTKEY:
      if (aiPlayer) {
        changeState(GAME_STATE_PAUSE_BEFORE_SIMON);
      }
      break;

    case GAME_STATE_PAUSE_BEFORE_SIMON:
      if (time > timeFinishState) {
        changeStateAfterDelay(GAME_STATE_PLAYGAME_SIMONSAYS);
      }
      break;

    case GAME_STATE_PLAYGAME_SIMONSAYS:
      if (time > timeFinishState) {

        if (simonPlaysOnlyNewNote) {
          playAndAnimateLight(lights[currentLevel - 1]);

          changeStateAfterDelay(GAME_STATE_PLAYGAME_PLAYERSAYS) ;

        } else {
          timeFinishState = time + gameRefreshPeriod ;
          console.log("SIMON PLAYS " + currentNote);
          playAndAnimateLight(lights[currentNote++]);
          if (currentNote == currentLevel) {

            changeStateAfterDelay(GAME_STATE_PLAYGAME_PLAYERSAYS) ;

          }
        }
      }
      break;

    case GAME_STATE_PLAYGAME_PLAYERSAYS:
        // Use our very clever AI player for debugging
        if (aiPlayer && time > timeFinishState) {
            timeFinishState = time + AI_PLAYER_DELAY ;
            playAndCheckAnimateLight(lights[currentNote]) ;
        }

      break;

    case GAME_STATE_ENDINGGAME:
      if (time > timeFinishState) {
        playAndAnimateAllLights() ;
        changeStateAfterDelay(GAME_STATE_ENDGAME);
      }
      break;

    case GAME_STATE_ENDGAME:
      resetGame() ;
      break;
  }

}

// Look at HRef to see What type of game we want to play.
function setUpGameType() {

  try {
    simonPlaysOnlyNewNote = false ;
    var uri = window.location.href.toLowerCase() ;

    if (uri.includes("singlenote")) {
        simonPlaysOnlyNewNote = true ;
    } else if (uri.includes("multinote")) {
      simonPlaysOnlyNewNote = false ;
    }
  } catch (e) {
    simonPlaysOnlyNewNote = false ;
  }

}

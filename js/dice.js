
function throwDice() {
  return Math.floor(Math.random() * 6) + 1;
}

var player1DiceThrow = throwDice() ;
var player2DiceThrow = throwDice() ;
var gameResult = (player1DiceThrow == player2DiceThrow) ? "Draw" :
  (player1DiceThrow > player2DiceThrow ? "Player 1 Wins" : "Player 2 Wins!");

var player1DiceeImage = `images/dice${player1DiceThrow}.png`;
var player2DiceeImage = `images/dice${player2DiceThrow}.png`;

//alert(`Throws ${player1DiceThrow} ${player2DiceThrow} ${gameResult}`) ;
var images = document.querySelectorAll(".img")
try {
  // Add in Images and Game result text
  if (images.length > 1) {

    images[0].setAttribute("src", player1DiceeImage);
    images[1].setAttribute("src", player2DiceeImage);
  } else {
      throw Error("Bad HTML Format Page - ") ;
  }
  document.querySelector(".gameResult").innerText = gameResult;

} catch (e) {
  alert('Exception --->' + e.message);
}

function throwDice() {
  return Math.floor(Math.random() * 6) + 1;
}


var player1Name = "Player 1";
var player2Name = "Player 2";

try {

  var [par1Str, par2Str] = window.location.href.split("?")[1].split('&');

  var pars1 = par1Str.split("=");
  var pars2 = par2Str.split("=");

  player1Name = (pars1[0] == 'player1' ? pars1[1] : pars2[1]);
  player2Name = (pars2[0] == 'player2' ? pars2[1] : pars1[1]);

} catch (e) {

}

var player1DiceThrow = throwDice();
var player2DiceThrow = throwDice();
var gameResult = (player1DiceThrow == player2DiceThrow) ? "Draw!" :
  (player1DiceThrow > player2DiceThrow ? player1Name + " Wins!" : player2Name + " Wins!");

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
    throw Error("Bad HTML Format Page - ");
  }
  document.querySelector(".gameResult").innerText = gameResult;

  document.querySelector("#player1Name").innerText = player1Name ;
  document.querySelector("#player2Name").innerText = player2Name ;



} catch (e) {
  alert('Exception --->' + e.message);
}

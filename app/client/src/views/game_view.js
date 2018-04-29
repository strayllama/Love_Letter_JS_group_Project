const GameView = function () {
}

GameView.prototype.getPlayerName = function (playerNumber) {
const playerNameInput = document.getElementById(`player${playerNumber}-inputName`); //input html box where users can type name
const playerName = playerNameInput.value;
const playerNameBox = document.getElementById(`player${playerNumber}-nameBox`) // div that previously contained an input
playerNameBox.innerHTML = `<h1>${playerName}</h1>`; // change input to title using the name inputted.
return playerName;
}

GameView.prototype.renderLayout = function (arrayOfPlayers) {
  // set up the space for cards
  for (i = 1; i <5; i++) {
    const playerHandCardImage = document.getElementById(`player${i}-handCardImage`);
    playerHandCardImage.src = url("./client/public/images/lovelettercard.png")
  }
}

GameView.prototype.showHandCard = function (player) {
  // Get player number from player then fill container for that player
  const playerNumber = player.playerNumber;
  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);
  handCardImage.src = "url(`./images/${player.card.character}.png`)";
}

GameView.prototype.showDeckCard = function (player, secondCard) {
  const playerNumber = player.playerNumber;
  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);
  deckCardImage.src = "url(`./images/${player.secondCard.character}.png`)";
}

GameView.prototype.unShowCards = function (playerArray) {
  // Get player number from player then fill container for that player
  for (player of playerArray) {
    const playerNumber = player.playerNumber;
    const HandImage = document.getElementById(`container${containerNumber}-handCardImage`);
    CardImage.src = url(`./images/lovelettercard.png`);
    const DeckImage = document.getElementById(`container${containerNumber}-deckCardImage`);
    CardImage.scr = url(`./images/blank.png`);
  }
}

module.exports = GameView;

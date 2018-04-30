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
  handCardImage.src = `./images/${player.card.character}.png`;

  console.log("trying to show player", playerNumber, "handcard of:", player.card.character);
}


GameView.prototype.showDeckCard = function (player, secondCard) {
  const playerNumber = player.playerNumber;
  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);
  deckCardImage.src = `./images/${secondCard.character}.png`;

  console.log("trying to show player", playerNumber, "deckcard of", secondCard.character);
}


GameView.prototype.unShowCards = function (playerArray) {
  // Get player number from player then fill container for that player
  console.log("UNSHOWING YOUR CARDS hahah");
  for (player of playerArray) {
    const playerNumber = player.playerNumber;
    const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);
    handCardImage.src = `./images/lovelettercard.png`;
    const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);
    deckCardImage.src = `./images/blank.png`;
  }
}

GameView.prototype.askForPlayerChoice = function (holderPlayer, playerArray) {
  const messagebox = document.getElementById("message-box");
  messagebox.textContent = "Choose player you wish to guess the card of:";
  const choiceSelector = document.createElement('select');
  let playerOptions = [];
  for(player of playerArray){
    if(player !== holderPlayer && player.aliveStatus && !player.protected) {
      playerOptions.push(player);
    } else {       // add message that you have no g
    }
  }
  for(player of playerOptions) {
    const option = document.createElement('option');
    option.textContent = player.character;
    option.value = player;
    choiceSelector.appendChild(option);
  }
  const controlBox = document.getElementById('controls');
  controlBox.appendChild(choiceSelector);
}
// returns list of active players, waits for user choice and returns that choice.

GameView.prototype.askForNumberChoice = function (holderPlayer) {

};

module.exports = GameView;

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
}


GameView.prototype.showDeckCard = function (player, secondCard) {
  const playerNumber = player.playerNumber;
  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);
  deckCardImage.src = `./images/${secondCard.character}.png`;
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


GameView.prototype.askForPlayerChoice = function (holderPlayer, playerArray, nextAction) {
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = "Choose player you wish to guess the card of:</br>";
  const choiceSelector = document.createElement('select');
  choiceSelector.id = "player-select";
  const submitChoice = document.createElement('button');
  submitChoice.id = "player-submit-button";
  submitChoice.textContent = "Submit Player Choice!"
  let playerOptions = [];
  for (player of playerArray){
    if(player !== holderPlayer && player.aliveStatus && !player.protected) {
      playerOptions.push(player);
    } else {       // add message that you have no g
    }
  }
  for (player of playerOptions) {
    const option = document.createElement('option');
    option.textContent = player.name;
    option.value = JSON.stringify(player);
    choiceSelector.appendChild(option);
  }
  const controlBox = document.getElementById('controls');
  controlBox.appendChild(choiceSelector);
  controlBox.appendChild(submitChoice);
  submitChoice.addEventListener('click', () => {
      const chosenPlayerNumber =  JSON.parse(choiceSelector.value).playerNumber;
      console.log("You choose player:", chosenPlayerNumber);
      // then go to next step of card action...
  });
}


GameView.prototype.askForPlayerChoiceGuard = function (holderPlayer, playerArray) {
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = "Choose the player you wish to guess the card of</br> and guess the card that player has.";
  const playerChoiceSelector = document.createElement('select');
  playerChoiceSelector.id = "player-select";
  const cardChoiceSelector = document.createElement('select');
  cardChoiceSelector.id = "card-select";
  const submitChoice = document.createElement('button');
  submitChoice.id = "choice-submit-button";
  submitChoice.textContent = "Submit Choices!"
  let playerOptions = [];
  for (player of playerArray){
    if(player !== holderPlayer && player.aliveStatus && !player.protected) {
      playerOptions.push(player);
    } else { messagebox.textContent = `You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round.`;
    }
  }
  for (player of playerOptions) {
    const option = document.createElement('option');
    option.textContent = player.name;
    option.value = JSON.stringify(player);
    playerChoiceSelector.appendChild(option);
  }
  for (let i = 2; i < 9; i++) {
    const optionNum = document.createElement('option');
    optionNum.textContent = i;
    optionNum.value = i;
    cardChoiceSelector.appendChild(optionNum);
  }
  const controlBox = document.getElementById('controls');
  controlBox.appendChild(playerChoiceSelector);
  controlBox.appendChild(cardChoiceSelector);
  controlBox.appendChild(submitChoice);
  submitChoice.addEventListener('click', () => {
      const chosenPlayerNumber =  JSON.parse(playerChoiceSelector.value).playerNumber;
      console.log("You choose player:", chosenPlayerNumber);
      console.log("You choose card number:", cardChoiceSelector.value);
      const chosenPlayer = playerArray[chosenPlayerNumber -1];
      console.log("chosen player =", chosenPlayer);
      console.log("chosen player card is:", chosenPlayer.card.value);
      if (chosenPlayer.card.value === cardChoiceSelector.value){
        chosenPlayer.aliveStatus = false;
        const messagebox = document.getElementById("message-box");
        messagebox.textContent = `You guessed CORRECT!! </br>"${chosenPlayer.name}" is out of the game!`;
        // turn.discardCard(selectedPlayer);
      };

      console.log("Picked player is alive still?: ", chosenPlayer.aliveStatus);

  });
}
// returns list of active players, waits for user choice and returns that choice.


GameView.prototype.askForNumberChoice = function (holderPlayer) {

};

module.exports = GameView;

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
  console.log("showing hand cards of player:", player.playerNumber);
  const playerNumber = player.playerNumber;
  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);
  handCardImage.src = `./images/${player.card.character}.png`;
}


GameView.prototype.showDeckCard = function (player, secondCard) {
  console.log("showing deck cards of player:", player.playerNumber);
  const playerNumber = player.playerNumber;
  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);
  deckCardImage.src = `./images/${secondCard.character}.png`;
}


GameView.prototype.unShowCards = function (playerArray) {
  // Get player number from player then fill container for that player
  console.log("UNSHOWING ALL CARDS");
  for (player of playerArray) {
    const playerNumber = player.playerNumber;
    const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);
    handCardImage.src = `./images/lovelettercard.png`;
    const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);
    deckCardImage.src = `./images/blank.png`;
  }
}


GameView.prototype.askForPlayerChoicePriest = function (holderPlayer, playerArray, endOfGoFunctions) {
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = `You played/discarded the Priest Card </br> ACTION: Choose the player you wish to SEE the card of:</br>`;
  const playerChoiceSelector = document.createElement('select');
  playerChoiceSelector.id = "player-select";
  const submitChoice = document.createElement('button');
  submitChoice.id = "player-submit-button";
  submitChoice.textContent = "Submit Player Choice!"
  let playerOptions = [];
  for (player of playerArray){
    if(player !== holderPlayer && player.aliveStatus && !player.protected) {
      playerOptions.push(player);
    } else { };
  }
  if (playerOptions.length === 0) {
    messagebox.textContent = `You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round.`;
  }
  else {
    for (player of playerOptions) {
      const option = document.createElement('option');
      option.textContent = player.name;
      option.value = JSON.stringify(player);
      playerChoiceSelector.appendChild(option);
    }

    const controlBox = document.getElementById('controls');
    controlBox.appendChild(playerChoiceSelector);
    controlBox.appendChild(submitChoice);
    submitChoice.addEventListener('click', () => {
      const chosenPlayerNumber =  JSON.parse(playerChoiceSelector.value).playerNumber;
      console.log("Player ",holderPlayer.playerNumber, "choose player:", chosenPlayerNumber);
      const chosenPlayer = playerArray[chosenPlayerNumber -1];
      console.log("Chosen player is:", chosenPlayer);
      console.log("Their hand card is:", chosenPlayer.card.value);
      const messagebox = document.getElementById("message-box");
      messagebox.textContent = `You choose to see card of </br>"${chosenPlayer.name}". </br>Their card is ${chosenPlayer.card.character}`;
      // turn.discardCard(selectedPlayer);
      controlBox.removeChild(playerChoiceSelector);
      controlBox.removeChild(submitChoice);
      // const playerCardImage = document.getElementById(`player${chosenPlayerNumber}-handCardImage`);
      this.showHandCard(chosenPlayer);
      endOfGoFunctions();
    });
  }
}


GameView.prototype.askForPlayerChoiceGuard = function (holderPlayer, playerArray, endOfGoFunctions) {
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = `You played/discarded the Guard Card</br> ACTION: Choose the player you wish to guess the card of</br> and guess the card that player has.`;
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
    } else { };
  };
  if (playerOptions.length === 0) {
    messagebox.textContent = `You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round.`;
  }
  else {
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
      console.log("Player ",holderPlayer.playerNumber, "choose player:", chosenPlayerNumber);
      console.log("And chose card number:", cardChoiceSelector.value);
      const chosenPlayer = playerArray[chosenPlayerNumber -1];
      console.log("Chosen player is:", chosenPlayer);
      console.log("Their hand card is:", chosenPlayer.card.value);
      if (chosenPlayer.card.value === cardChoiceSelector.value){
        chosenPlayer.aliveStatus = false;
        const messagebox = document.getElementById("message-box");
        messagebox.textContent = `You guessed CORRECT!! </br>"${chosenPlayer.name}" is out of the game!`;
        // turn.discardCard(selectedPlayer);
      };
      controlBox.removeChild(playerChoiceSelector);
      controlBox.removeChild(cardChoiceSelector);
      controlBox.removeChild(submitChoice);
      console.log("Chosen player is alive still?: ", chosenPlayer.aliveStatus);
      endOfGoFunctions();
    });
  }  /// THIS NEEDS TO GO BELOW ALL CHOICE AND SUBMIT BITS is the else closure for when
  // all remaining players have handmaid

} // end askForPlayerChoiceGuard


// returns list of active players, waits for user choice and returns that choice.
GameView.prototype.askForNumberChoice = function (holderPlayer) {

};

module.exports = GameView;

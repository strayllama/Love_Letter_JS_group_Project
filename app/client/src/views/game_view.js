const GameView = function () {
  this.numDiscardedCards = 0;
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
  for (player of playerArray) {
    const playerNumber = player.playerNumber;
    const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);
    if (player.aliveStatus) {
      handCardImage.src = `./images/lovelettercard.png`;
    } else {
      handCardImage.src = `./images/dead.png`;
    }
    const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);
    deckCardImage.src = `./images/blank.png`;
  }
}

GameView.prototype.askForPlayerChoicePrincess = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("princess");
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = `You played/discarded the Princess Card. </br>  You are now out of the game!`;
  holderPlayer.aliveStatus = false;
  this.unShowCards(playerArray);
  endOfGoFunctions();
};



GameView.prototype.askForPlayerChoiceCountess = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("countess");
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = `You played/discarded the Countess Card. </br>`;
  endOfGoFunctions();
}; // Handmaid




GameView.prototype.askForPlayerChoiceKing = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("king");
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = `You played/discarded the King Card </br> ACTION: Choose the player you wish to swap cards with:</br>`;
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
    messagebox.innerHTML = `You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round.`;
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
      messagebox.innerHTML = `You choose to swap cards with </br>"${chosenPlayer.name}". </br>Your new card is ${chosenPlayer.card.character}.`;
      // turn.discardCard(selectedPlayer);
      controlBox.removeChild(playerChoiceSelector);
      controlBox.removeChild(submitChoice);

      const holderPlayerCard = holderPlayer.card;
      const chosenPlayerCard = chosenPlayer.card;
      holderPlayer.card = chosenPlayerCard;
      chosenPlayer.card = holderPlayerCard;

      const chosenPlayerCardImage = document.getElementById(`player${chosenPlayer.playerNumber}-handCardImage`);
      chosenPlayerCardImage.src = `./images/${chosenPlayer.card.character}.png`;

      const playerCardImage = document.getElementById(`player${holderPlayer.playerNumber}-handCardImage`);
      playerCardImage.src = `./images/${holderPlayer.card.character}.png`;
      const playerDeckImage = document.getElementById(`player${holderPlayer.playerNumber}-deckCardImage`);
      playerDeckImage.src = `./images/blank.png`;
      endOfGoFunctions();
    });
  }
} // KING




GameView.prototype.askForPlayerChoicePrince = function (holderPlayer, playerArray, endOfGoFunctions, deck) {
  this.addToDiscard("prince");
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = `You played/discarded the Prince Card </br> ACTION: Choose the player you wish to have to discard their card</br>`;
  const playerChoiceSelector = document.createElement('select');
  playerChoiceSelector.id = "player-select";
  const submitChoice = document.createElement('button');
  submitChoice.id = "player-submit-button";
  submitChoice.textContent = "Submit Player Choice!"
  let playerOptions = [];
  for (player of playerArray){
    if(player.aliveStatus && !player.protected) {
      playerOptions.push(player);
    } else { };
  }
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
    messagebox.innerHTML = `You chose to make "${chosenPlayer.name}" discard their card`;      controlBox.removeChild(playerChoiceSelector);
    controlBox.removeChild(submitChoice);
    this.addToDiscard(`${chosenPlayer.card.character.toLowerCase()}`);
    if (chosenPlayer.card.character === "Princess") {
      chosenPlayer.aliveStatus = false;
      messagebox.innerHTML = `You chose to make "${chosenPlayer.name}" discard their card </br> They had the Princess so they are now dead!`;
    } else {
      console.log("deck counter: ",deck.counter);
      if(!deck.noCardsLeft){
        chosenPlayer.card = deck.drawCard();
        console.log("deck still has cards left");
      } else {
        chosenPlayer.card = deck.initialRemovedCard;
        console.log("player was given initial removed card");
      }
      const playerCardImage = document.getElementById(`player${holderPlayer.playerNumber}-handCardImage`);
      playerCardImage.src = `./images/${holderPlayer.card.character}.png`;
    }
    endOfGoFunctions();
  });
}  // PRINCE



GameView.prototype.askForPlayerChoiceHandmaid = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("handmaid");
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = `You played/discarded the Handmaid Card. </br> You are protected from other card actions until your next go `;
  holderPlayer.protected = true;
  endOfGoFunctions();
}; // Handmaid





GameView.prototype.askForPlayerChoiceBaron = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("baron");
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = `You played/discarded the Baron Card </br> ACTION: Choose the player you wish to compare hands with:</br>`;
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
    messagebox.innerHTML = `You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round.`;
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
      messagebox.innerHTML = `You choose to compare cards with </br>"${chosenPlayer.name}". </br>Their card is ${chosenPlayer.card.character}`;
      // turn.discardCard(selectedPlayer);
      controlBox.removeChild(playerChoiceSelector);
      controlBox.removeChild(submitChoice);
      // const playerCardImage = document.getElementById(`player${chosenPlayerNumber}-handCardImage`);
      this.showHandCard(chosenPlayer);
      if(chosenPlayer.card.value < holderPlayer.card.value) {
        chosenPlayer.aliveStatus = false;
        messagebox.innerHTML = `Your card is higher than ${chosenPlayer.name}'s - ${chosenPlayer.name} dies!`
      } else if (chosenPlayer.card.value > holderPlayer.card.value) {
        holderPlayer.aliveStatus = false;
        messagebox.innerHTML = `Your card is lower than ${chosenPlayer.name}'s - you die!`
      } else {
        messagebox.innerHTML = `You both have the same valued card - no one dies`;
      }
      endOfGoFunctions();
    });
  }
}







GameView.prototype.askForPlayerChoicePriest = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("priest");
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
    messagebox.innerHTML = `You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round.`;
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
      messagebox.innerHTML = `You choose to see card of </br>"${chosenPlayer.name}". </br>Their card is ${chosenPlayer.card.character}`;
      // turn.discardCard(selectedPlayer);
      controlBox.removeChild(playerChoiceSelector);
      controlBox.removeChild(submitChoice);
      this.showHandCard(chosenPlayer);
      endOfGoFunctions();
    });
  }
}


GameView.prototype.askForPlayerChoiceGuard = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("guard");
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
    messagebox.innerHTML = `You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round.`;
    endOfGoFunctions();

  } else {
    for (player of playerOptions) {
      const option = document.createElement('option');
      option.textContent = player.name;
      option.value = JSON.stringify(player);
      playerChoiceSelector.appendChild(option);
    }
    for (let i = 2; i < 9; i++) {
      const optionCharacter = document.createElement('option');
      switch (i){
        case 2:
        optionCharacter.textContent = 'Priest';
        optionCharacter.value = 'Priest';
        break;
        case 3:
        optionCharacter.textContent = 'Baron';
        optionCharacter.value = 'Baron';
        break;
        case 4:
        optionCharacter.textContent = 'Handmaid';
        optionCharacter.value = 'Handmaid';
        break;
        case 5:
        optionCharacter.textContent = 'Prince';
        optionCharacter.value = 'Prince';
        break;
        case 6:
        optionCharacter.textContent = 'King';
        optionCharacter.value = 'King';
        break;
        case 7:
        optionCharacter.textContent = 'Countess';
        optionCharacter.value = 'Countess';
        break;
        case 8:
        optionCharacter.textContent = 'Princess';
        optionCharacter.value = 'Princess';
        break;
      }
      cardChoiceSelector.appendChild(optionCharacter);
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
      if (chosenPlayer.card.character === cardChoiceSelector.value){
        chosenPlayer.aliveStatus = false;
        const messagebox = document.getElementById("message-box");
        messagebox.innerHTML = `Correct! You guessed ${chosenPlayer.name} had a ${cardChoiceSelector.value},</br>"${chosenPlayer.name}" is out of the game!`;
        // turn.discardCard(selectedPlayer);
      } else {
        const messagebox = document.getElementById("message-box");
        messagebox.innerHTML = `Wrong! ${chosenPlayer.name} does not have a ${cardChoiceSelector.value}`;
      }
      controlBox.removeChild(playerChoiceSelector);
      controlBox.removeChild(cardChoiceSelector);
      controlBox.removeChild(submitChoice);
      console.log("Chosen player is alive still?: ", chosenPlayer.aliveStatus);
      endOfGoFunctions();
    });
  }  /// THIS NEEDS TO GO BELOW ALL CHOICE AND SUBMIT BITS is the else closure for when

} // end askForPlayerChoiceGuard

GameView.prototype.addToDiscard = function (cardName) {
  const pile = document.getElementById('discard-pile-container');
  const discardedCard = document.createElement('img');
  discardedCard.src = `./images/${cardName}.png`;
  console.log("number of cards in discard pile: ", this.numDiscardedCards);
  if (!(this.numDiscardedCards === 0)) {
    const yShift = (this.numDiscardedCards * 280 * (-1));
    console.log(yShift);
    // discardedCard.style = `transform: translateY(${yShift}px)`;
    discardedCard.style.transform = `translateY(${yShift}px)`;
    console.log(discardedCard.style);
  }
  pile.appendChild(discardedCard);

  this.numDiscardedCards += 1;
}

module.exports = GameView;

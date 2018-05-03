const GameView = function () {
  this.numDiscardedCards = 0;
}

const characterMessages = {
  Guard: "ACTION: Choose a player and guess their card",
  Priest: "ACTION: Choose a player whose card you wish to see",
  Baron: "ACTION: Choose a player you wish to compare hands with",
  Handmaid: "You are protected from other card actions until your next go",
  Prince: "ACTION: Choose a player to discard their card",
  King: "ACTION: Choose a player you wish to swap cards with",
  Countess: "",
  Princess: "You are now out of the game!"
}

// START OF HELPER FUNCTIONS

const setImage = function(player, handOrDeck, imageName) {
  const playerNumber = player.playerNumber;
  const image = document.getElementById(`player${playerNumber}-${handOrDeck}CardImage`);
  image.src = `./images/${imageName}.png`
}

const setTextInMessageBoxUponCardClick = function(character) {
  const messagebox = document.getElementById("message-box");
  messagebox.innerHTML = `You played the ${character} card </br> ${characterMessages[character]}`
}

const setUpPlayerDropDown = function(holderPlayer, playerArray, isAPrince) {
  const playerChoiceSelector = document.createElement('select');
  playerChoiceSelector.classList = "control-item";
  playerChoiceSelector.id = "player-select";
  // const submitChoice = document.createElement('button');
  // submitChoice.classList = "control-item";
  // submitChoice.id = "player-submit-button";
  // submitChoice.textContent = "Submit Player Choice!"
  let playerOptions = [];
  if(isAPrince) {
    for (const player of playerArray){
      if(player.aliveStatus && !player.protected) {
        playerOptions.push(player);
      } else { }
    }
    for (const player of playerOptions) {
      const option = document.createElement('option');
      option.classList = "control-item";
      option.textContent = player.name;
      option.value = JSON.stringify(player);
      playerChoiceSelector.appendChild(option);
    }

    const controlBox = document.getElementById('controls');
    controlBox.appendChild(playerChoiceSelector);
    // controlBox.appendChild(submitChoice);

  } else {
    for (const player of playerArray){
      if(player !== holderPlayer && player.aliveStatus && !player.protected) {
        playerOptions.push(player);
      } else { }
    }
    if (playerOptions.length === 0) {
      messagebox.innerHTML = `You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round`;
      endOfGoFunctions();
    }
    else {
      for (const player of playerOptions) {
        const option = document.createElement('option');
        option.classList = "control-item";
        option.textContent = player.name;
        option.value = JSON.stringify(player);
        playerChoiceSelector.appendChild(option);
      }

      const controlBox = document.getElementById('controls');
      controlBox.appendChild(playerChoiceSelector);
    }
  }
  return playerChoiceSelector;
}

const setUpSubmitButton = function() {
  const submitChoice = document.createElement('button');
  submitChoice.classList = "control-item";
  submitChoice.id = "player-submit-button";
  submitChoice.textContent = "Submit Player Choice!"

  const controlBox = document.getElementById('controls');
  controlBox.appendChild(submitChoice);

  return submitChoice;
}

// END OF HELPER FUNCTIONS

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
  const imageName = player.card.character;
  setImage(player, "hand", imageName);
}

GameView.prototype.showDeckCard = function (player, secondCard) {
  console.log("showing deck cards of player:", player.playerNumber);
  const imageName = secondCard.character;
  setImage(player, "deck", imageName);
}

GameView.prototype.unShowCards = function (playerArray) {
  // Get player number from player then fill container for that player
  for (const player of playerArray) {
    if (player.aliveStatus) {
      setImage(player, "hand", "lovelettercard");
    } else {
      setImage(player,"hand", "dead");
    }
    setImage(player, "deck","blank");
  }
}

GameView.prototype.askForPlayerChoicePrincess = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("princess");
  setTextInMessageBoxUponCardClick("Princess");
  holderPlayer.aliveStatus = false;
  this.unShowCards(playerArray);
  endOfGoFunctions();
}




GameView.prototype.askForPlayerChoiceCountess = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("countess");
  setTextInMessageBoxUponCardClick("Countess");
  endOfGoFunctions();
}




GameView.prototype.askForPlayerChoiceKing = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("king");
  setTextInMessageBoxUponCardClick("King");
  const playerChoiceSelector = setUpPlayerDropDown(holderPlayer, playerArray, false);
  submitChoice = setUpSubmitButton();
  submitChoice.addEventListener('click', () => {

    const chosenPlayerNumber =  JSON.parse(playerChoiceSelector.value).playerNumber;
    console.log("Player ",holderPlayer.playerNumber, "choose player:", chosenPlayerNumber);
    const chosenPlayer = playerArray[chosenPlayerNumber -1];
    console.log("Chosen player is:", chosenPlayer);
    console.log("Their hand card is:", chosenPlayer.card.value);
    const messagebox = document.getElementById("message-box");
    messagebox.innerHTML = `You choose to swap cards with "${chosenPlayer.name}" </br>Your new card is ${chosenPlayer.card.character}`;
    // turn.discardCard(selectedPlayer);
    const controlBox = document.getElementById('controls');
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




GameView.prototype.askForPlayerChoicePrince = function (holderPlayer, playerArray, endOfGoFunctions, deck) {
  this.addToDiscard("prince");
  setTextInMessageBoxUponCardClick("Prince");
  const playerChoiceSelector = setUpPlayerDropDown(holderPlayer, playerArray, true);
  submitChoice = setUpSubmitButton();
  submitChoice.addEventListener('click', () => {
    const chosenPlayerNumber =  JSON.parse(playerChoiceSelector.value).playerNumber;
    console.log("Player ",holderPlayer.playerNumber, "choose player:", chosenPlayerNumber);
    const chosenPlayer = playerArray[chosenPlayerNumber -1];
    console.log("Chosen player is:", chosenPlayer);
    console.log("Their hand card is:", chosenPlayer.card.value);
    const messagebox = document.getElementById("message-box");
    messagebox.innerHTML = `You chose to make "${chosenPlayer.name}" discard their card`;
    const controlBox = document.getElementById('controls');
    controlBox.removeChild(playerChoiceSelector);
    controlBox.removeChild(submitChoice);

    // Like the baron, this shows the discarded card in the discard pile and the player's hand simultaneously - need to fix
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
}




GameView.prototype.askForPlayerChoiceHandmaid = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("handmaid");
  setTextInMessageBoxUponCardClick("Handmaid");
  holderPlayer.protected = true;
  endOfGoFunctions();
}




GameView.prototype.askForPlayerChoiceBaron = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("baron");
  setTextInMessageBoxUponCardClick("Baron");
  const playerChoiceSelector = setUpPlayerDropDown(holderPlayer, playerArray, false);
  submitChoice = setUpSubmitButton();
  submitChoice.addEventListener('click', () => {
    const chosenPlayerNumber =  JSON.parse(playerChoiceSelector.value).playerNumber;
    console.log("Player ",holderPlayer.playerNumber, "choose player:", chosenPlayerNumber);
    const chosenPlayer = playerArray[chosenPlayerNumber -1];
    console.log("Chosen player is:", chosenPlayer);
    console.log("Their hand card is:", chosenPlayer.card.value);
    const messagebox = document.getElementById("message-box");
    messagebox.innerHTML = `You choose to compare cards with "${chosenPlayer.name}"</br>Their card is ${chosenPlayer.card.character}`;
    // turn.discardCard(selectedPlayer);
    const controlBox = document.getElementById('controls');
    controlBox.removeChild(playerChoiceSelector);
    controlBox.removeChild(submitChoice);
    // const playerCardImage = document.getElementById(`player${chosenPlayerNumber}-handCardImage`);
    this.showHandCard(chosenPlayer);
    if(chosenPlayer.card.value < holderPlayer.card.value) {
      chosenPlayer.aliveStatus = false;
      messagebox.innerHTML = `Your card is higher than ${chosenPlayer.name}'s - ${chosenPlayer.name} dies!`

      // Need to think about - discarded card wasn't being shown in plie; really want it to appear when end of go button pressed...
      this.addToDiscard(chosenPlayer.card.character);


    } else if (chosenPlayer.card.value > holderPlayer.card.value) {
      holderPlayer.aliveStatus = false;
      messagebox.innerHTML = `Your card is lower than ${chosenPlayer.name}'s - you die!`

      // Need to think about - discarded card wasn't being shown in plie; really want it to appear when end of go button pressed...
      this.addToDiscard(holderPlayer.card.character);
    } else {
      messagebox.innerHTML = `You both have the same valued card - no one dies`;
    }
    endOfGoFunctions();
  });
}




GameView.prototype.askForPlayerChoicePriest = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("priest");
  setTextInMessageBoxUponCardClick("Priest");
  const playerChoiceSelector = setUpPlayerDropDown(holderPlayer, playerArray, false);
  submitChoice = setUpSubmitButton();
  submitChoice.addEventListener('click', () => {
    const chosenPlayerNumber =  JSON.parse(playerChoiceSelector.value).playerNumber;
    console.log("Player ",holderPlayer.playerNumber, "choose player:", chosenPlayerNumber);
    const chosenPlayer = playerArray[chosenPlayerNumber -1];
    console.log("Chosen player is:", chosenPlayer);
    console.log("Their hand card is:", chosenPlayer.card.value);
    const messagebox = document.getElementById("message-box");
    messagebox.innerHTML = `You choose to see card of "${chosenPlayer.name}" </br>Their card is ${chosenPlayer.card.character}`;
    const controlBox = document.getElementById('controls');
    controlBox.removeChild(playerChoiceSelector);
    controlBox.removeChild(submitChoice);
    this.showHandCard(chosenPlayer);
    endOfGoFunctions();
  });
}




GameView.prototype.askForPlayerChoiceGuard = function (holderPlayer, playerArray, endOfGoFunctions) {
  this.addToDiscard("guard");
  setTextInMessageBoxUponCardClick("Guard");
  const cardChoiceSelector = document.createElement('select');
  cardChoiceSelector.classList = "control-item";
  cardChoiceSelector.id = "card-select";
  const playerChoiceSelector = setUpPlayerDropDown(holderPlayer, playerArray, false);
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
    submitChoice = setUpSubmitButton();
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
  }

GameView.prototype.addToDiscard = function (cardName) {
  const pile = document.getElementById('discard-pile-container');
  const discardedCard = document.createElement('img');
  discardedCard.src = `./images/${cardName}.png`;
  console.log("number of cards in discard pile: ", this.numDiscardedCards);
  discardedCard.classList = "discarded-card";
  if (!(this.numDiscardedCards === 0)) {
    const yShift = (this.numDiscardedCards * 280 * (-1));
    console.log(yShift);
    discardedCard.style.transform = `translateY(${yShift}px)`;
    console.log(discardedCard.style);
  }
  pile.appendChild(discardedCard);

  this.numDiscardedCards += 1;
}

module.exports = GameView;

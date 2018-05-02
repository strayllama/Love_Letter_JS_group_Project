const Turn = function (activePlayer, gameView, deck, playerArray) {
  this.secondCard = null;
  this.activePlayer = activePlayer;
  this.playerNumber = activePlayer.playerNumber;
  this.activePlayer.protected = false;
  this.gameView = gameView;
  this.deck = deck;
  this.playerArray = playerArray;
  this.handCardNotUsed = true;
  this.deckCardNotUsed = true;
}


Turn.prototype.playerIsActive = function (gameView) {
  if(this.activePlayer.aliveStatus){
    const messagebox = document.getElementById("message-box");
    messagebox.innerHTML = `Your turn "${this.activePlayer.name}" </br> Choose the card your wish to play!`;
    gameView.showHandCard(this.activePlayer);
    this.handCardNotUsed = true;
  }
  return this.activePlayer.aliveStatus;
}


Turn.prototype.getSecondCard = function (deck, gameView) {
  this.secondCard = deck.drawCard();
  gameView.showDeckCard(this.activePlayer, this.secondCard);
  this.deckCardNotUsed = true;
}


Turn.prototype.activateCardChoiceEventListener = function (endOfGoFunctions) {
  const playerNumber = this.playerNumber;
  console.log("ActiveCardPickListener ON for player:", playerNumber);
  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);
  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);

  if ((this.secondCard.character === "King" || this.secondCard.character === "Prince") && this.activePlayer.card.character === "Countess") {
    handCardImage.addEventListener('click', () => { this.handImageHandler(endOfGoFunctions) });
  }
  else if ((this.activePlayer.card.character === "King" || this.activePlayer.card.character === "Prince ") && this.secondCard.character === "Countess" ) {
    deckCardImage.addEventListener('click', () => { this.deckImageHandler(endOfGoFunctions) });
  }
  else {
    handCardImage.addEventListener('click', () => {this.handImageHandler(endOfGoFunctions) });
    deckCardImage.addEventListener('click', () => {this.deckImageHandler(endOfGoFunctions) });
  }
}


Turn.prototype.handImageHandler = function (endOfGoFunctions) {
  console.log("Turn of Player:", this.playerNumber, "Clicked hand card.");
  if (this.handCardNotUsed) {
    const playedCard = this.activePlayer.card;
    const cardNumber = playedCard.value;
    const action = this.deck.cardActions[`${cardNumber}`-1];
  //  console.log("Player: ", this.playerNumber," Clicked Hand card.");
    this.activePlayer.card = this.secondCard;
    this.secondCard = null;
    this.handCardNotUsed = false;
    this.deckCardNotUsed = false;
    // discard that card.
    const discardedHandCardImage = document.getElementById(`player${this.activePlayer.playerNumber}-handCardImage`);
    discardedHandCardImage.src = `./images/${this.activePlayer.card.character}.png`;

    const deckCardImage = document.getElementById(`player${this.activePlayer.playerNumber}-deckCardImage`);
    deckCardImage.src = `./images/blank.png`;
    console.log(" Playing Player has laid down their Hand card:", playedCard);
    console.log(" Their NEW hand card is:", this.activePlayer.card);
    action(this.activePlayer, this.gameView, this.playerArray, endOfGoFunctions, this.deck);
  };
};

Turn.prototype.deckImageHandler = function (endOfGoFunctions) {
  console.log("Turn of Player:", this.playerNumber, "Clicked deck card.");
  if (this.deckCardNotUsed) {
    const playedCard = this.secondCard;
    const cardNumber = playedCard.value;
    const action = this.deck.cardActions[`${cardNumber}`-1]
  //  console.log("Player: ", this.playerNumber," Clicked Deck card.");
    this.secondCard = null;
    this.handCardNotUsed = false;
    this.deckCardNotUsed = false;
    // discard that card.
    const discardedDeckCardImage = document.getElementById(`player${this.activePlayer.playerNumber}-deckCardImage`);
    discardedDeckCardImage.src = `./images/blank.png`;
    console.log(" Playing Player has laid down their deck card:", playedCard);
    console.log(" The player is left with a hand card now of:", this.activePlayer.card);
    action(this.activePlayer, this.gameView, this.playerArray, endOfGoFunctions, this.deck);
  };
};


module.exports = Turn;

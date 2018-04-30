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
    gameView.showHandCard(this.activePlayer);
  }
  return this.activePlayer.aliveStatus;
}


Turn.prototype.getSecondCard = function (deck, gameView) {
  this.secondCard = deck.drawCard();
  gameView.showDeckCard(this.activePlayer, this.secondCard);
}

Turn.prototype.deactivateCardChoiceEventListener = function () {
  const playerNumber = this.playerNumber;
  console.log("TRYING to deactive player", playerNumber, "s card listeners");
  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);
  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);
  handCardImage.removeEventListener('click', () => {this.handImageHandler()});
  // handCardImage.onclick = null;
  deckCardImage.removeEventListener('click', () => {this.deckImageHandler()});
};

Turn.prototype.activateCardChoiceEventListener = function () {
  const playerNumber = this.playerNumber;
  console.log("WAITING FOR PLAYER TO PICK CARD!, player:",playerNumber);
  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);
  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);

  if (this.secondCard.character === "King" || this.secondCard.character === "Prince" && this.activePlayer.card.character === "Countess") {
    handCardImage.addEventListener('click', () => { this.handImageHandler() });
  }
  else if (this.activePlayer.card.character === "King" || this.activePlayer.card.character === "Prince " && this.secondCard.character === "Countess" ) {
    deckCardImage.addEventListener('click', () => { this.deckImageHandler() });
  }
  else {
    handCardImage.addEventListener('click', () => {this.handImageHandler() });
    deckCardImage.addEventListener('click', () => {this.deckImageHandler() });
  }
}

// const handImageHandler = () => {
Turn.prototype.handImageHandler = function (e) {
  if (this.handCardNotUsed) {
//    console.log('context of clicked image', this); // turnLogic is the context!
    this.deactivateCardChoiceEventListener();
    const playedCard = this.activePlayer.card;
    const cardNumber = playedCard.value;
    const action = this.deck.cardActions[`${cardNumber}`-1];
    action(this.activePlayer, this.gameView, this.playerArray);
    // discard that card.
    this.activePlayer.card = this.secondCard;
    this.secondCard = null;
    this.handCardNotUsed = false;
    this.deckCardNotUsed = false;
  };
};

// const deckImageHandler = () => {
Turn.prototype.deckImageHandler = function () {
  if (this.deckCardNotUsed) {
    this.deactivateCardChoiceEventListener();
    const playedCard = this.secondCard;
    const cardNumber = playedCard.value;
    const action = this.deck.cardActions[`${cardNumber}`-1]
    action(this.activePlayer, this.gameView, this.playerArray);
    // discard that card.
    this.secondCard = null;
    this.handCardNotUsed = false;
    this.deckCardNotUsed = false;
  };
}

module.exports = Turn;

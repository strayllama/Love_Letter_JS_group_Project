let secondCard = null;

const Turn = function (activePlayer) {
  this.activePlayer = activePlayer;
  this.playerNumber = activePlayer.playerNumber;
  this.activePlayer.protected = false;
}

Turn.prototype.playerIsActive = function (gameView) {
  if(this.activePlayer.aliveStatus){
    gameView.showHandCard(this.activePlayer);
  }
  return this.activePlayer.aliveStatus;
}

Turn.prototype.getSecondCard = function (deck, gameView) {
  secondCard = deck.drawCard();
  console.log(secondCard);
  gameView.showDeckCard(this.activePlayer, secondCard);
}


Turn.prototype.activateCardChoiceEventListener = function () {
  const playerNumber = this.playerNumber;
  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);
  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);
  if (secondCard.character === "king" || secondCard.character === "prince" && this.activePlayer.card.character === "countess") {
    handCardImage.addEventListener('click', handImageHandler);
  }
  else if (this.activePlayer.card.character === "king" || this.activePlayer.card.character === "prince " && secondCard.character === "countess" ) {
    deckCardImage.addEventListener('click', deckImageHandler);
  }
  else {
    handCardImage.addEventListener('click', handImageHandler);
    deckCardImage.addEventListener('click', deckImageHandler);
  }
}

Turn.prototype.deactivateCardChoiceEventListener = function () {
  const playerNumber = this.playerNumber;
  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);
  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);
  handCardImage.removeEventListener('click', handImageHandler);
  deckCardImage.removeEventListener('click', deckImageHandler);
}

const handImageHandler = function(event) {
  deactivateCardChoiceEventListener();
  const playedCard = this.activePlayer.card;
  const cardNumber = playedCard.cardNumber;
  playedCard.actions[`${cardNumber}`](this.activePlayer);
  // discard that card.
  this.activePlayer.card = this.secondCard;
  this.secondCard = null;
}

const deckImageHandler = function(event) {
  deactivateCardChoiceEventListener(playerNumber);
  const playedCard = this.activePlayer.secondCard;
  const cardNumber = playedCard.cardNumber;
  playedCard.actions[`${cardNumber}`](this.activePlayer);
  // discard that card.
  this.secondCard = null;
}

module.exports = Turn;

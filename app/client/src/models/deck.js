const DeckRequest = require('../services/request.js');

const Deck = function() {
  this.apiDeckInfo = {};
  this.cardDeck = [];
  this.counter = 0;
  this.noCardsLeft = false;
  this.cardActions = [];
  this.initialRemovedCard = null;

  const guard = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {
    gameView.askForPlayerChoiceGuard(holderPlayer, playerArray, endOfGoFunctions);
  };

  const priest = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {
    gameView.askForPlayerChoicePriest(holderPlayer, playerArray, endOfGoFunctions);
  };

  const baron = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {
    gameView.askForPlayerChoiceBaron(holderPlayer, playerArray, endOfGoFunctions);
  };

  const handmaid = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {
    gameView.askForPlayerChoiceHandmaid(holderPlayer, playerArray, endOfGoFunctions);
  };

  const prince = function (holderPlayer, gameView, playerArray, endOfGoFunctions, deck) {
    gameView.askForPlayerChoicePrince(holderPlayer, playerArray, endOfGoFunctions, deck);
  };

  const king = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {
    gameView.askForPlayerChoiceKing(holderPlayer, playerArray, endOfGoFunctions);
  };

  const countess = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {
    gameView.askForPlayerChoiceCountess(holderPlayer, playerArray, endOfGoFunctions);
  };

  const princess = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {
    gameView.askForPlayerChoicePrincess(holderPlayer, playerArray, endOfGoFunctions);
  };

  this.cardActions.push(guard);
  this.cardActions.push(priest);
  this.cardActions.push(baron);
  this.cardActions.push(handmaid);
  this.cardActions.push(prince);
  this.cardActions.push(king);
  this.cardActions.push(countess);
  this.cardActions.push(princess);
}; // end Deck constructor


Deck.prototype.getDeckData = function (gotCardData) {
  const deckRequest = new DeckRequest('http://localhost:3000/data4players');

  const getDataRequestComplete = ((cardData) => {
    cardData.forEach((card) => {
      this.apiDeckInfo[card.character] = card;
    });
    gotCardData();
  }); // end getDataRequestComplete callback function

  deckRequest.get(getDataRequestComplete);
};

Deck.prototype.formDeck = function(){
  for (let i = 1; i < 6; i++){
    this.cardDeck.push(this.apiDeckInfo.Guard);
    this.cardDeck.push(this.apiDeckInfo.Prince); // TEMPO - DELETE!!!!!

  }
  for (let i = 1; i < 2; i++){
    this.cardDeck.push(this.apiDeckInfo.Priest); //priest
    this.cardDeck.push(this.apiDeckInfo.Baron); // baron
    this.cardDeck.push(this.apiDeckInfo.Handmaid);
    this.cardDeck.push(this.apiDeckInfo.Prince);
  }
  this.cardDeck.push(this.apiDeckInfo.King);
  this.cardDeck.push(this.apiDeckInfo.Countess);
  this.cardDeck.push(this.apiDeckInfo.Princess);
}

Deck.prototype.shuffleDeck = function () {
  let currentIndex =  this.cardDeck.length;
  let temporaryValue = 0;
  let randomIndex = 0;
  while (0!== currentIndex) {
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;
    temporaryValue = this.cardDeck[currentIndex];
    this.cardDeck[currentIndex] = this.cardDeck[randomIndex];
    this.cardDeck[randomIndex] = temporaryValue;
  }
}

Deck.prototype.drawCard = function () {
  const cardToReturn = this.cardDeck[this.counter]
  this.counter += 1;
  if(this.counter === this.cardDeck.length -1) {
    this.noCardsLeft = true;
  };
  return cardToReturn;
};

Deck.prototype.removeInitialCard = function() {
  this.initialRemovedCard = this.drawCard();
}


module.exports = Deck;
//
//
// GUARD
// card.protoype.action1 = function(holderPlayer){
//
//   const selectedPlayer = gameView.askForPlayerChoice(); -- checks for active players and give list of said players, waits for user choice and returns that choice.
//
//   const numberChoice = gameView.askForNumberChoice(); -- give player options 2-8 or names, waits for user choice then returns that number.
//
//   if (selectedPlayer.card.cardNumber === numberChoice){
//     selectedPlayer.aliveStatus = false;
//     turn.discardCard(selectedPlayer);
//   }
//   end player turn
// }
//
// PRIEST
// card.prototype.action2 = function(holderPlayer){
//
//   const selectedPlayer = gameView.askForPlayerChoice(); -- checks for active players and give list of said players, waits for user choice and returns that choice.
//
//   gameView.revealCard(selectedPlayer); -- reveals selected card
//
//   ends player turn
// }
//
// BARON
// card.prototype.action3 = function(holderPlayer){
//
//   const selectedPlayer = gameView.askForPlayerChoice(); -- checks for active players and give list of said players, waits for user choice and returns that choice.
//
//   gameView.revealCard(selectedPlayer);
//   if (selectedPlayer.card.cardNumber > holderPlayer.card.cardNumber)
//   {holderPlayer.aliveStatus = false;}
//   else if (selectedPlayer.card.cardNumber < holderPlayer.card.cardNumber)
//   {selectedPlayer.aliveStatus = false;}
//
//   ends player turn
// }
//
// HANDMAID
// card.protoype.action4 = function(holderPlayer){
//
//   holderPlayer.protected = true;
// }
//
// PRINCE
// card.prototype.action5 = function(holderPlayer){
//
//   const selectedPlayer = gameView.askForPlayerChoice(); -- checks for active players and give list of said players, waits for user choice and returns that choice.
//
//   const drawnCard = deck.drawCard();
//   if(selectedPlayer.card === princessCard){
//     selectedPlayer.card.action8(selectedPlayer)
//   }
//   turn.discardCard(selectedPlayer);
//   selectedPlayer.card = drawnCard;
//
//   ends player turn
// }
//
//
// KING
// card.prototype.action6 = function(holderPlayer){
//
//   const selectedPlayer = gameView.askForPlayerChoice(); -- checks for active players and give list of said players, waits for user choice and returns that choice.
//
//   const holderPlayerCard = holderPlayer.card;
//   const selectedPlayerCard = selectedPlayer.card;
//
//   holderPlayer.card = selectedPlayerCard;
//   selectedPlayer.card = holderPlayerCard;
//
//   ends player turn
// }
//
//
// COUNTESS
// card.prototype.action7 = function(holderPlayer){
//
//   ends player turn
// }
//
//
// PRINCESS
// card.prototype.action8 = function(holderPlayer){
//
//   holderPlayer.aliveStatus = false;
//
//   ends player turn
// }

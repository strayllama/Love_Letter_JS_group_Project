const DeckRequest = require('../services/request.js');
let apiDeckInfo = [];
let cardDeck = [];
let counter = 0;
let noCardsLeft = false;

const Deck = function() {
  const deckRequest = new DeckRequest('http://localhost:3000/data4players');
  const getDataRequestComplete = function (cardData) {
    console.log("dataReq",cardData);
    cardData.forEach((card) => apiDeckInfo.push(card));
      // console.log(card.character);
      // console.log(card.value);
      // console.log(card.description);
      // console.log(card.numberOfCards);
      //console.log("pushing a card  into apiDeckInfo", card);

  };
  console.log("stored data",apiDeckInfo);
  deckRequest.get(getDataRequestComplete);
}; // end Deck constructor


Deck.prototype.formDeck = function(){
  for (let i = 1; i < 6; i++){
    console.log(apiDeckInfo.guard);
    cardDeck.push(apiDeckInfo.guard)
  }
  for (let i = 1; i < 3; i++){
    cardDeck.push(apiDeckInfo.priest)
    cardDeck.push(apiDeckInfo.baron)
    cardDeck.push(apiDeckInfo.handmaid)
    cardDeck.push(apiDeckInfo.prince)
  }
  cardDeck.push(apiDeckInfo.king)
  cardDeck.push(apiDeckInfo.countess)
  cardDeck.push(apiDeckInfo.princess)
  console.log("createdCardDeck",cardDeck);
}

Deck.prototype.shuffleDeck = function () {
  let currentIndex =  cardDeck.length;
  let temporaryValue = 0;
  let randomIndex = 0;
  while (0!== currentIndex) {
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;
    temporaryValue = cardDeck[currentIndex];
    cardDeck[currentIndex] = cardDeck[randomIndex];
    cardDeck[randomIndex] = temporaryValue;
  }
}

Deck.prototype.drawCard = function () {
  const cardToReturn = cardDeck[counter]
  counter += 1;
  if(counter === cardDeck.length) {
    noCardsLeft = true;
  }
  return cardToReturn;
}

module.exports = Deck;

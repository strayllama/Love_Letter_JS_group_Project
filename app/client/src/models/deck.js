const DeckRequest = require('../services/request.js');

const Deck = function() {
  console.log("Making Deck object");
  this.apiDeckInfo = {};
  this.cardDeck = [];
  this.counter = 0;
  this.noCardsLeft = false;
}; // end Deck constructor

Deck.prototype.getDeckData = function (gotCardData) {
  console.log("Getting Deck Data");
  const deckRequest = new DeckRequest('http://localhost:3000/data4players');

  const getDataRequestComplete = ((cardData) => {
    console.log("dataReq",cardData);
    console.log("our api info deck empty?:",this.apiDeckInfo);
    cardData.forEach((card) => {
       this.apiDeckInfo[card.character] = card;
    });
    gotCardData();
  }); // end getDataRequestComplete callback function

  deckRequest.get(getDataRequestComplete);
};

Deck.prototype.formDeck = function(){
  console.log("Forming Deck");
  for (let i = 1; i < 6; i++){
    this.cardDeck.push(this.apiDeckInfo.Guard);
  }
  for (let i = 1; i < 3; i++){
    this.cardDeck.push(this.apiDeckInfo.Priest); //priest
    this.cardDeck.push(this.apiDeckInfo.Baron); // baron
    this.cardDeck.push(this.apiDeckInfo.Handmaid);
    this.cardDeck.push(this.apiDeckInfo.Prince);
  }
  this.cardDeck.push(this.apiDeckInfo.King);
  this.cardDeck.push(this.apiDeckInfo.Countess);
  this.cardDeck.push(this.apiDeckInfo.Princess);
  console.log("createdCardDeck",this.cardDeck);
  // console.log("Forming Deck");
  // for (let i = 1; i < 6; i++){
  //   const object = this.apiDeckInfo["Guard"];
  //   this.cardDeck[`Guard${i}`] = object;
  // }
  // for (let i = 1; i < 3; i++){
  //   this.cardDeck[`Priest${i}`] = this.apiDeckInfo.Priest; //priest
  //   this.cardDeck[`Baron${i}`] = this.apiDeckInfo.Baron; // baron
  //   this.cardDeck[`Handmaid${i}`] = this.apiDeckInfo.Handmaid;
  //   this.cardDeck[`Prince${i}`] = this.apiDeckInfo.Prince;
  // }
  // this.cardDeck["King"] = this.apiDeckInfo.King;
  // this.cardDeck["Countess"] = this.apiDeckInfo.Countess;
  // this.cardDeck["Princess"] = this.apiDeckInfo.Princess;
  // console.log("createdCardDeck",this.cardDeck);
}

Deck.prototype.shuffleDeck = function () {
  console.log("Shuffling deck.... forever?");
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
  if(this.counter === this.cardDeck.length) {
    this.noCardsLeft = true;
  };
  return cardToReturn;
};

module.exports = Deck;

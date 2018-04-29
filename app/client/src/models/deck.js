const Deck = function(){
  const deckRequest = new DeckRequest('url....')
  const apiDeckInfo = deckRequest.get();
  this.deck = []
  let counter = 0;
  let noCardsLeft = false;
}

Deck.prototype.formDeck = function(){
  for(let i = 1; i < 6; i++){
    this.deck.push(apiDeckInfo.guard)
  }
  for(let i = 1; i < 3; i++){
    this.deck.push(apiDeckInfo.priest)
    this.deck.push(apiDeckInfo.baron)
    this.deck.push(apiDeckInfo.handmaid)
    this.deck.push(apiDeckInfo.prince)
  }
  this.deck.push(apiDeckInfo.king)
  this.deck.push(apiDeckInfo.countess)
  this.deck.push(apiDeckInfo.princess)
}

Deck.prototype.shuffleDeck = function () {
  let currentIndex = this.deck.length;
  let temporaryValue = 0;
  let randomIndex = 0;
  while (0!== currentIndex) {
  randomIndex = Math.floor(Math.random()*currentIndex);
  currentIndex -= 1;
  temporaryValue = this.deck[currentIndex];
  this.deck[currentIndex] = this.deck[randomIndex];
  this.deck[randomIndex] = temporaryValue;
  }
}

Deck.prototype.drawCard = function () {
const cardToReturn = this.deck[counter]
  counter += 1;
  if(counter === this.deck.length) {
  noCardsLeft = true;
  }
  return cardToReturn;
}

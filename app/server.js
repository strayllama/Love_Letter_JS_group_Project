const express = require('express');
const parser = require('body-parser');
const app = express();

app.use(express.static('client/public'));

app.get('/', (req, res) => {
  res.sendFile(`${ __dirname }/client/public/index.html`);
});

const data4PlayerArray = [
  {
    "Character": "Guard",
    "Value": "1",
    "NumberOfCards": "5",
    "Description": "Name a non-Guard card and choose another player. If that player has that card, he or she is out of the round.",
    "Image": ""
  },{
    "Character": "Priest",
    "Value": "2",
    "NumberOfCards": "2",
    "Description": "Look at another player's hand.",
    "Image": ""
  },{
    "Character": "Baron",
    "Value": "3",
    "NumberOfCards": "2",
    "Description": "You and another player secretly compare hands. The player with the lower value is out of the round.",
    "Image": ""
  },{
    "Character": "Handmaid",
    "Value": "4",
    "NumberOfCards": "2",
    "Description": "Until your next turn, ignore all effects from other players' cards.",
    "Image": ""
  },{
    "Character": "Prince",
    "Value": "5",
    "NumberOfCards": "1",
    "Description": "Choose any player (including yourself) to discard his or her hand and draw a new card.",
    "Image": ""
  },{
    "Character": "King",
    "Value": "6",
    "NumberOfCards": "1",
    "Description": "Trade hands with another player of your choice.",
    "Image":
  },{
    "Character": "Countess",
    "Value": "7",
    "NumberOfCards": "1",
    "Description": "If you have this card and the King or Prince is in your hand, you must discard this card.",
    "Image":
  },{
    "Character": "Princess",
    "Value": "8",
    "NumberOfCards": "1",
    "Description": "If you discard this card, you are out of the round.",
    "Image":
  }]

  // INDEX Route - get all data from our API
  server.get('/data4players', function (req, res) {
    console.log("***INDEXall: Returning all data on Loveletter Server.");
    res.json(data4PlayerArray);
  })
});

app.listen(3000, function () {
  console.log(`Example app listening on port ${ this.address().port }`);
});

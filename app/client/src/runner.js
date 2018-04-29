const Request = require('./services/request.js');
const SetUpHelper = require('./helpers/setup.js');
const GameView = require('./views/game_view.js');
const Player = require('./models/player.js');
const Turn = require('./models/turn.js');

const request = new Request('http://localhost:3000/data4players');  // Request object to connect to our API



const getDataRequestComplete = function (cardData) {
  // cardData.forEach((card) => {
  // console.log(card.description);
  // }
}

document.addEventListener('DOMContentLoaded', function () {
  request.get(getDataRequestComplete);

  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', handleStartGameButton)

});

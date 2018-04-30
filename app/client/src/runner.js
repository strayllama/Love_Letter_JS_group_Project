const SetUpHelper = require('./helpers/setup.js');
const GameView = require('./views/game_view.js');
const Player = require('./models/player.js');
const Turn = require('./models/turn.js');

let deck;
let initalRemovedCard;
let gameNotWon = true;
let playerArray = [];

SetUpHelper.setUpDeck((finishedDeck) => {
  deck = finishedDeck;
  initalRemovedCard = deck.drawCard();
  console.log(initalRemovedCard);
  // make start button active!!!
});

const gameView = new GameView();

const handleStartGameButton = function () {
  playerArray =  SetUpHelper.setUpPlayers(deck, gameView);
  playGame();
}

const playGame = function () {
  let turnCounter = 0;
  let skippedPlayer = 0;
  let playerWon = null;

  while (gameNotWon) {
    console.log("GAME STARTED");
    const turnLogic = new Turn(playerArray[turnCounter]);

    if (turnLogic.playerIsActive(gameView)) {
      // put all turn activites
      turnLogic.getSecondCard(deck, gameView);
      turnLogic.activateCardChoiceEventListener();

      const goEndButton = document.getElementById('end-go-button');
      goEndButton.style.background = "rgb(138, 218, 105)";
      // goEndButton.style.hover =
      // goEndButton.style.active =
      //
      // #end-go-button:hover {background-color: rgb(55, 221, 57)}
      // #end-go-button:active {
      // background-color: rgb(92, 231, 27);
      // box-shadow: 1px 2px #666;
      // transform: translateY(3px);
      // }

      const goNotFinished = true;
      const handleGoEndButtonClick = function () {
        goNotFinished = false;
      }
      goEndButton.addEventListener('click', handleGoEndButtonClick)
      while (goNotFinished) {
        //wait
      }

      gameView.unShowCards(playerArray); /// NEEDED HERE?
      skippedPlayer = 0;
    } else { skippedPlayer += 1 }
    if (turnCounter < 3) { turnCounter += 1 }
    else { turnCounter = 0 };

    if (skippedPlayer === 3) {
      gameNotWon = false;
      // logic to set playerWon to the last remaining active player.
    } else if (deck.noCardsLeft) {
      gameNotWon = false;
      // logic to compare values of active players cards.
    }

  } // end while loop - play game
  // GAME END CHAT!
  console.log("SOME ONE WON!", playerWon);
}


document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', handleStartGameButton)
});

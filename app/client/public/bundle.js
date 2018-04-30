/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/runner.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/helpers/setup.js":
/*!*************************************!*\
  !*** ./client/src/helpers/setup.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Deck = __webpack_require__(/*! ../models/deck.js */ \"./client/src/models/deck.js\")\nconst Player = __webpack_require__(/*! ../models/player.js */ \"./client/src/models/player.js\")\n\nconst SetUpHelper = {}\n\nSetUpHelper.setUpDeck = function (onComplete) {\n  console.log(\"Called setUpDeck helper method\");\n  const deck = new Deck();\n\n  deck.getDeckData(() => {\n    deck.formDeck();\n    deck.shuffleDeck();\n    onComplete(deck);\n  })\n\n};\n\nSetUpHelper.setUpPlayers = function (deck, gameView) {\n  const player1 = new Player(gameView.getPlayerName(1), 1);\n  const player2 = new Player(gameView.getPlayerName(2), 2);\n  const player3 = new Player(gameView.getPlayerName(3), 3);\n  const player4 = new Player(gameView.getPlayerName(4), 4);\n\n  player1.card = deck.drawCard();\n  player2.card = deck.drawCard();\n  player3.card = deck.drawCard();\n  player4.card = deck.drawCard();\n\n  return [player1, player2, player3, player4];\n}\n\n\nmodule.exports = SetUpHelper\n\n\n//# sourceURL=webpack:///./client/src/helpers/setup.js?");

/***/ }),

/***/ "./client/src/models/deck.js":
/*!***********************************!*\
  !*** ./client/src/models/deck.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DeckRequest = __webpack_require__(/*! ../services/request.js */ \"./client/src/services/request.js\");\n\nconst Deck = function() {\n  console.log(\"Making Deck object\");\n  this.apiDeckInfo = {};\n  this.cardDeck = [];\n  this.counter = 0;\n  this.noCardsLeft = false;\n}; // end Deck constructor\n\nDeck.prototype.getDeckData = function (gotCardData) {\n  console.log(\"Getting Deck Data\");\n  const deckRequest = new DeckRequest('http://localhost:3000/data4players');\n\n  const getDataRequestComplete = ((cardData) => {\n    console.log(\"dataReq\",cardData);\n    console.log(\"our api info deck empty?:\",this.apiDeckInfo);\n    cardData.forEach((card) => {\n       this.apiDeckInfo[card.character] = card;\n    });\n    gotCardData();\n  }); // end getDataRequestComplete callback function\n\n  deckRequest.get(getDataRequestComplete);\n};\n\nDeck.prototype.formDeck = function(){\n  console.log(\"Forming Deck\");\n  for (let i = 1; i < 6; i++){\n    this.cardDeck.push(this.apiDeckInfo.Guard);\n  }\n  for (let i = 1; i < 3; i++){\n    this.cardDeck.push(this.apiDeckInfo.Priest); //priest\n    this.cardDeck.push(this.apiDeckInfo.Baron); // baron\n    this.cardDeck.push(this.apiDeckInfo.Handmaid);\n    this.cardDeck.push(this.apiDeckInfo.Prince);\n  }\n  this.cardDeck.push(this.apiDeckInfo.King);\n  this.cardDeck.push(this.apiDeckInfo.Countess);\n  this.cardDeck.push(this.apiDeckInfo.Princess);\n  console.log(\"createdCardDeck\",this.cardDeck);\n  // console.log(\"Forming Deck\");\n  // for (let i = 1; i < 6; i++){\n  //   const object = this.apiDeckInfo[\"Guard\"];\n  //   this.cardDeck[`Guard${i}`] = object;\n  // }\n  // for (let i = 1; i < 3; i++){\n  //   this.cardDeck[`Priest${i}`] = this.apiDeckInfo.Priest; //priest\n  //   this.cardDeck[`Baron${i}`] = this.apiDeckInfo.Baron; // baron\n  //   this.cardDeck[`Handmaid${i}`] = this.apiDeckInfo.Handmaid;\n  //   this.cardDeck[`Prince${i}`] = this.apiDeckInfo.Prince;\n  // }\n  // this.cardDeck[\"King\"] = this.apiDeckInfo.King;\n  // this.cardDeck[\"Countess\"] = this.apiDeckInfo.Countess;\n  // this.cardDeck[\"Princess\"] = this.apiDeckInfo.Princess;\n  // console.log(\"createdCardDeck\",this.cardDeck);\n}\n\nDeck.prototype.shuffleDeck = function () {\n  console.log(\"Shuffling deck.... forever?\");\n  let currentIndex =  this.cardDeck.length;\n  let temporaryValue = 0;\n  let randomIndex = 0;\n  while (0!== currentIndex) {\n    randomIndex = Math.floor(Math.random()*currentIndex);\n    currentIndex -= 1;\n    temporaryValue = this.cardDeck[currentIndex];\n    this.cardDeck[currentIndex] = this.cardDeck[randomIndex];\n    this.cardDeck[randomIndex] = temporaryValue;\n  }\n}\n\nDeck.prototype.drawCard = function () {\n  const cardToReturn = this.cardDeck[this.counter]\n  this.counter += 1;\n  if(this.counter === this.cardDeck.length) {\n    this.noCardsLeft = true;\n  };\n  return cardToReturn;\n};\n\nmodule.exports = Deck;\n\n\n//# sourceURL=webpack:///./client/src/models/deck.js?");

/***/ }),

/***/ "./client/src/models/player.js":
/*!*************************************!*\
  !*** ./client/src/models/player.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Player = function(name, playerNumber){\n  this.name = name;\n  this.card = null;\n  this.aliveStatus = true;\n  this.protected = false;\n  this.playerNumber = playerNumber;\n}\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack:///./client/src/models/player.js?");

/***/ }),

/***/ "./client/src/models/turn.js":
/*!***********************************!*\
  !*** ./client/src/models/turn.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let secondCard = null;\n\nconst Turn = function (activePlayer) {\n  this.activePlayer = activePlayer;\n  this.playerNumber = activePlayer.playerNumber;\n  this.activePlayer.protected = false;\n}\n\nTurn.prototype.playerIsActive = function (gameView) {\n  if(this.activePlayer.aliveStatus){\n    gameView.showHandCard(this.activePlayer);\n  }\n  return this.activePlayer.aliveStatus;\n}\n\nTurn.prototype.getSecondCard = function (deck, gameView) {\n  secondCard = deck.drawCard();\n  console.log(secondCard);\n  gameView.showDeckCard(this.activePlayer, secondCard);\n}\n\n\nTurn.prototype.activateCardChoiceEventListener = function () {\n  const playerNumber = this.playerNumber;\n  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);\n  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);\n  if (secondCard.character === \"king\" || secondCard.character === \"prince\" && this.activePlayer.card.character === \"countess\") {\n    handCardImage.addEventListener('click', handImageHandler);\n  }\n  else if (this.activePlayer.card.character === \"king\" || this.activePlayer.card.character === \"prince \" && secondCard.character === \"countess\" ) {\n    deckCardImage.addEventListener('click', deckImageHandler);\n  }\n  else {\n    handCardImage.addEventListener('click', handImageHandler);\n    deckCardImage.addEventListener('click', deckImageHandler);\n  }\n}\n\nTurn.prototype.deactivateCardChoiceEventListener = function () {\n  const playerNumber = this.playerNumber;\n  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);\n  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);\n  handCardImage.removeEventListener('click', handImageHandler);\n  deckCardImage.removeEventListener('click', deckImageHandler);\n}\n\nconst handImageHandler = function(event) {\n  deactivateCardChoiceEventListener();\n  const playedCard = this.activePlayer.card;\n  const cardNumber = playedCard.cardNumber;\n  playedCard.actions[`${cardNumber}`](this.activePlayer);\n  // discard that card.\n  this.activePlayer.card = this.secondCard;\n  this.secondCard = null;\n}\n\nconst deckImageHandler = function(event) {\n  deactivateCardChoiceEventListener(playerNumber);\n  const playedCard = this.activePlayer.secondCard;\n  const cardNumber = playedCard.cardNumber;\n  playedCard.actions[`${cardNumber}`](this.activePlayer);\n  // discard that card.\n  this.secondCard = null;\n}\n\nmodule.exports = Turn;\n\n\n//# sourceURL=webpack:///./client/src/models/turn.js?");

/***/ }),

/***/ "./client/src/runner.js":
/*!******************************!*\
  !*** ./client/src/runner.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SetUpHelper = __webpack_require__(/*! ./helpers/setup.js */ \"./client/src/helpers/setup.js\");\nconst GameView = __webpack_require__(/*! ./views/game_view.js */ \"./client/src/views/game_view.js\");\nconst Player = __webpack_require__(/*! ./models/player.js */ \"./client/src/models/player.js\");\nconst Turn = __webpack_require__(/*! ./models/turn.js */ \"./client/src/models/turn.js\");\n\nlet deck;\nlet initalRemovedCard;\nlet gameNotWon = true;\nlet playerArray = [];\n\nSetUpHelper.setUpDeck((finishedDeck) => {\n  deck = finishedDeck;\n  initalRemovedCard = deck.drawCard();\n  console.log(initalRemovedCard);\n  // make start button active!!!\n});\n\nconst gameView = new GameView();\n\nconst handleStartGameButton = function () {\n  playerArray =  SetUpHelper.setUpPlayers(deck, gameView);\n  playGame();\n}\n\nconst playGame = function () {\n  let turnCounter = 0;\n  let skippedPlayer = 0;\n  let playerWon = null;\n\n  while (gameNotWon) {\n    console.log(\"GAME STARTED\");\n    const turnLogic = new Turn(playerArray[turnCounter]);\n\n    if (turnLogic.playerIsActive(gameView)) {\n      // put all turn activites\n      turnLogic.getSecondCard(deck, gameView);\n      turnLogic.activateCardChoiceEventListener();\n\n      const goEndButton = document.getElementById('end-go-button');\n      goEndButton.style.background = \"rgb(138, 218, 105)\";\n      // goEndButton.style.hover =\n      // goEndButton.style.active =\n      //\n      // #end-go-button:hover {background-color: rgb(55, 221, 57)}\n      // #end-go-button:active {\n      // background-color: rgb(92, 231, 27);\n      // box-shadow: 1px 2px #666;\n      // transform: translateY(3px);\n      // }\n\n      const goNotFinished = true;\n      const handleGoEndButtonClick = function () {\n        goNotFinished = false;\n      }\n      goEndButton.addEventListener('click', handleGoEndButtonClick)\n      while (goNotFinished) {\n        //wait\n      }\n\n      gameView.unShowCards(playerArray); /// NEEDED HERE?\n      skippedPlayer = 0;\n    } else { skippedPlayer += 1 }\n    if (turnCounter < 3) { turnCounter += 1 }\n    else { turnCounter = 0 };\n\n    if (skippedPlayer === 3) {\n      gameNotWon = false;\n      // logic to set playerWon to the last remaining active player.\n    } else if (deck.noCardsLeft) {\n      gameNotWon = false;\n      // logic to compare values of active players cards.\n    }\n\n  } // end while loop - play game\n  // GAME END CHAT!\n  console.log(\"SOME ONE WON!\", playerWon);\n}\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  const startButton = document.getElementById('start-button');\n  startButton.addEventListener('click', handleStartGameButton)\n});\n\n\n//# sourceURL=webpack:///./client/src/runner.js?");

/***/ }),

/***/ "./client/src/services/request.js":
/*!****************************************!*\
  !*** ./client/src/services/request.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function (url) {\n  this.url = url;\n};\n\nRequest.prototype.get = function(onApiRequestComplete) {\n  const request = new XMLHttpRequest();\n  request.open('GET', this.url);\n  request.addEventListener('load', function () {\n    if(this.status !== 200) {\n      return;\n    }\n    const responseBody = JSON.parse(this.responseText);\n    onApiRequestComplete(responseBody);\n  });\n  request.send();\n};\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./client/src/services/request.js?");

/***/ }),

/***/ "./client/src/views/game_view.js":
/*!***************************************!*\
  !*** ./client/src/views/game_view.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const GameView = function () {\n}\n\nGameView.prototype.getPlayerName = function (playerNumber) {\nconst playerNameInput = document.getElementById(`player${playerNumber}-inputName`); //input html box where users can type name\nconst playerName = playerNameInput.value;\nconst playerNameBox = document.getElementById(`player${playerNumber}-nameBox`) // div that previously contained an input\nplayerNameBox.innerHTML = `<h1>${playerName}</h1>`; // change input to title using the name inputted.\nreturn playerName;\n}\n\nGameView.prototype.renderLayout = function (arrayOfPlayers) {\n  // set up the space for cards\n  for (i = 1; i <5; i++) {\n    const playerHandCardImage = document.getElementById(`player${i}-handCardImage`);\n    playerHandCardImage.src = url(\"./client/public/images/lovelettercard.png\")\n  }\n}\n\nGameView.prototype.showHandCard = function (player) {\n  // Get player number from player then fill container for that player\n  const playerNumber = player.playerNumber;\n  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);\n  handCardImage.src = \"url(`./images/${player.card.character}.png`)\";\n}\n\nGameView.prototype.showDeckCard = function (player, secondCard) {\n  const playerNumber = player.playerNumber;\n  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);\n  deckCardImage.src = \"url(`./images/${player.secondCard.character}.png`)\";\n}\n\nGameView.prototype.unShowCards = function (playerArray) {\n  // Get player number from player then fill container for that player\n  for (player of playerArray) {\n    const playerNumber = player.playerNumber;\n    const HandImage = document.getElementById(`container${containerNumber}-handCardImage`);\n    CardImage.src = url(`./images/lovelettercard.png`);\n    const DeckImage = document.getElementById(`container${containerNumber}-deckCardImage`);\n    CardImage.scr = url(`./images/blank.png`);\n  }\n}\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./client/src/views/game_view.js?");

/***/ })

/******/ });
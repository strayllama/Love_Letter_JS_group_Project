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

eval("const Deck = __webpack_require__(/*! ../models/deck.js */ \"./client/src/models/deck.js\")\nconst Player = __webpack_require__(/*! ../models/player.js */ \"./client/src/models/player.js\")\n\nconst SetUpHelper = {}\n\nSetUpHelper.setUpDeck = function () {\n  const deck = new Deck();\n  deck.formDeck();\n  deck.shuffle();\n  return deck;\n}\n\nSetUpHelper.setUpPlayers = function (deck, gameView) {\n  const player1 = new Player(gameView.getPlayerName(1), 1);\n  const player2 = new Player(gameView.getPlayerName(2), 2);\n  const player3 = new Player(gameView.getPlayerName(3), 3);\n  const player4 = new Player(gameView.getPlayerName(4), 4);\n\n  player1.card = deck.drawCard();\n  player2.card = deck.drawCard();\n  player3.card = deck.drawCard();\n  player4.card = deck.drawCard();\n\n  return [player1, player2, player3, player4];\n}\n\n\nmodule.exports = SetUpHelper\n\n\n//# sourceURL=webpack:///./client/src/helpers/setup.js?");

/***/ }),

/***/ "./client/src/models/deck.js":
/*!***********************************!*\
  !*** ./client/src/models/deck.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Deck = function(){\n  const deckRequest = new DeckRequest('url....')\n  const apiDeckInfo = deckRequest.get();\n  this.deck = []\n  let counter = 0;\n  let noCardsLeft = false;\n}\n\nDeck.prototype.formDeck = function(){\n  for(let i = 1; i < 6; i++){\n    this.deck.push(apiDeckInfo.guard)\n  }\n  for(let i = 1; i < 3; i++){\n    this.deck.push(apiDeckInfo.priest)\n    this.deck.push(apiDeckInfo.baron)\n    this.deck.push(apiDeckInfo.handmaid)\n    this.deck.push(apiDeckInfo.prince)\n  }\n  this.deck.push(apiDeckInfo.king)\n  this.deck.push(apiDeckInfo.countess)\n  this.deck.push(apiDeckInfo.princess)\n}\n\nDeck.prototype.shuffleDeck = function () {\n  let currentIndex = this.deck.length;\n  let temporaryValue = 0;\n  let randomIndex = 0;\n  while (0!== currentIndex) {\n  randomIndex = Math.floor(Math.random()*currentIndex);\n  currentIndex -= 1;\n  temporaryValue = this.deck[currentIndex];\n  this.deck[currentIndex] = this.deck[randomIndex];\n  this.deck[randomIndex] = temporaryValue;\n  }\n}\n\nDeck.prototype.drawCard = function () {\nconst cardToReturn = this.deck[counter]\n  counter += 1;\n  if(counter === this.deck.length) {\n  noCardsLeft = true;\n  }\n  return cardToReturn;\n}\n\n\n//# sourceURL=webpack:///./client/src/models/deck.js?");

/***/ }),

/***/ "./client/src/models/player.js":
/*!*************************************!*\
  !*** ./client/src/models/player.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Player = function(name, playerNumber){\n  this.name = name;\n  this.card = null;\n  this.aliveStatus = true;\n  this.protected = false;\n  this.playerNumber = playerNumber;\n}\n\n\n//# sourceURL=webpack:///./client/src/models/player.js?");

/***/ }),

/***/ "./client/src/runner.js":
/*!******************************!*\
  !*** ./client/src/runner.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Request = __webpack_require__(/*! ./services/request.js */ \"./client/src/services/request.js\");\nconst SetUpHelper = __webpack_require__(/*! ./helpers/setup.js */ \"./client/src/helpers/setup.js\");\nconst GameView = __webpack_require__(/*! ./views/game_view.js */ \"./client/src/views/game_view.js\");\nconst Player = __webpack_require__(/*! ./models/player.js */ \"./client/src/models/player.js\");\nconst Turn = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module \\\"./models/turn.js\\\"\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nconst request = new Request('http://localhost:3000/data4players');  // Request object to connect to our API\n\n\n\nconst getDataRequestComplete = function (cardData) {\n  // cardData.forEach((card) => {\n  // console.log(card.description);\n  // }\n}\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  request.get(getDataRequestComplete);\n\n  const startButton = document.getElementById('start-button');\n  startButton.addEventListener('click', handleStartGameButton)\n\n});\n\n\n//# sourceURL=webpack:///./client/src/runner.js?");

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

eval("const GameView = function () {\n}\n\nGameView.prototype.getPlayerName = function (playerNumber) {\nconst playerNameInput = document.getElementById(`player${playerNumber}-inputName`); //input html box where users can type name\nconst playerName = playerNameInput.getValue();\nconst playerNameBox = document.getElementById(``) // div that previously contained an input\nplayerNameBox.innerHTML = `<h1>${playerName}</h1>`; // change input to title using the name inputted.\nreturn playerName;\n}\n\nGameView.prototype.renderLayout = function (arrayOfPlayers) {\n  // set up the space for cards\n  for (i = 1; i <5; i++) {\n    const playerHandCardImage = document.getElementById('player${i}-handCardImage');\n    playerHandCardImage.src = url(\"../public/images/lovelettercard.png\")\n  }\n}\n\nGameView.prototype.showHandCard = function (player) {\n  // Get player number from player then fill container for that player\n  const playerNumber = player.playerNumber;\n  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);\n  handCardImage.src = url(`../public/images/${player.card.Character}.png`);\n}\n\nGameView.prototype.showDeckCard = function (player, secondCard) {\n  const playerNumber = player.playerNumber;\n  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);\n  deckCardImage.src = url(`../public/images/${player.secondCard.Character}.png`);\n}\n\nGameView.prototype.unShowCards = function (playerArray) {\n  // Get player number from player then fill container for that player\n  for (player of playerArray) {\n    const playerNumber = player.playerNumber;\n    const HandImage = document.getElementById(`container${containerNumber}-handCardImage`);\n    CardImage.src = url(`../public/images/lovelettercard.png`);\n    const DeckImage = document.getElementById(`container${containerNumber}-deckCardImage`);\n    CardImage.scr = url(`../public/images/blank.png`);\n  }\n}\n\n\n//# sourceURL=webpack:///./client/src/views/game_view.js?");

/***/ })

/******/ });
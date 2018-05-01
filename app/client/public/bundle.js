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

eval("const Deck = __webpack_require__(/*! ../models/deck.js */ \"./client/src/models/deck.js\")\nconst Player = __webpack_require__(/*! ../models/player.js */ \"./client/src/models/player.js\")\n\nconst SetUpHelper = {}\n\nSetUpHelper.setUpDeck = function (onComplete) {\n  const deck = new Deck();\n\n  deck.getDeckData(() => {\n    deck.formDeck();\n    deck.shuffleDeck();\n    onComplete(deck);\n  })\n};\n\n\nSetUpHelper.setUpPlayers = function (deck, gameView) {\n  const player1 = new Player(gameView.getPlayerName(1), 1);\n  const player2 = new Player(gameView.getPlayerName(2), 2);\n  const player3 = new Player(gameView.getPlayerName(3), 3);\n  const player4 = new Player(gameView.getPlayerName(4), 4);\n\n  player1.card = deck.drawCard();\n  player2.card = deck.drawCard();\n  player3.card = deck.drawCard();\n  player4.card = deck.drawCard();\n\n  return [player1, player2, player3, player4];\n}\n\n\nmodule.exports = SetUpHelper\n\n\n//# sourceURL=webpack:///./client/src/helpers/setup.js?");

/***/ }),

/***/ "./client/src/models/deck.js":
/*!***********************************!*\
  !*** ./client/src/models/deck.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DeckRequest = __webpack_require__(/*! ../services/request.js */ \"./client/src/services/request.js\");\n\nconst Deck = function() {\n  this.apiDeckInfo = {};\n  this.cardDeck = [];\n  this.counter = 0;\n  this.noCardsLeft = false;\n  this.cardActions = [];\n\n  const guard = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {\n    gameView.askForPlayerChoiceGuard(holderPlayer, playerArray, endOfGoFunctions);\n  };\n\n  const priest = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {\n    gameView.askForPlayerChoicePriest(holderPlayer, playerArray, endOfGoFunctions);\n  };\n\n  this.cardActions.push(guard);\n  this.cardActions.push(priest);\n}; // end Deck constructor\n\n\nDeck.prototype.getDeckData = function (gotCardData) {\n  const deckRequest = new DeckRequest('http://localhost:3000/data4players');\n\n  const getDataRequestComplete = ((cardData) => {\n    cardData.forEach((card) => {\n      this.apiDeckInfo[card.character] = card;\n    });\n    gotCardData();\n  }); // end getDataRequestComplete callback function\n\n  deckRequest.get(getDataRequestComplete);\n};\n\nDeck.prototype.formDeck = function(){\n  for (let i = 1; i < 6; i++){\n    this.cardDeck.push(this.apiDeckInfo.Guard);\n    this.cardDeck.push(this.apiDeckInfo.Priest); // TEMPO - DELETE!!!!!\n\n  }\n  for (let i = 1; i < 2; i++){\n    this.cardDeck.push(this.apiDeckInfo.Priest); //priest\n    this.cardDeck.push(this.apiDeckInfo.Baron); // baron\n    this.cardDeck.push(this.apiDeckInfo.Handmaid);\n    this.cardDeck.push(this.apiDeckInfo.Prince);\n  }\n  this.cardDeck.push(this.apiDeckInfo.King);\n  this.cardDeck.push(this.apiDeckInfo.Countess);\n  this.cardDeck.push(this.apiDeckInfo.Princess);\n}\n\nDeck.prototype.shuffleDeck = function () {\n  let currentIndex =  this.cardDeck.length;\n  let temporaryValue = 0;\n  let randomIndex = 0;\n  while (0!== currentIndex) {\n    randomIndex = Math.floor(Math.random()*currentIndex);\n    currentIndex -= 1;\n    temporaryValue = this.cardDeck[currentIndex];\n    this.cardDeck[currentIndex] = this.cardDeck[randomIndex];\n    this.cardDeck[randomIndex] = temporaryValue;\n  }\n}\n\nDeck.prototype.drawCard = function () {\n  const cardToReturn = this.cardDeck[this.counter]\n  this.counter += 1;\n  if(this.counter === this.cardDeck.length) {\n    this.noCardsLeft = true;\n  };\n  return cardToReturn;\n};\n\n\nmodule.exports = Deck;\n//\n//\n// GUARD\n// card.protoype.action1 = function(holderPlayer){\n//\n//   const selectedPlayer = gameView.askForPlayerChoice(); -- checks for active players and give list of said players, waits for user choice and returns that choice.\n//\n//   const numberChoice = gameView.askForNumberChoice(); -- give player options 2-8 or names, waits for user choice then returns that number.\n//\n//   if (selectedPlayer.card.cardNumber === numberChoice){\n//     selectedPlayer.aliveStatus = false;\n//     turn.discardCard(selectedPlayer);\n//   }\n//   end player turn\n// }\n//\n// PRIEST\n// card.prototype.action2 = function(holderPlayer){\n//\n//   const selectedPlayer = gameView.askForPlayerChoice(); -- checks for active players and give list of said players, waits for user choice and returns that choice.\n//\n//   gameView.revealCard(selectedPlayer); -- reveals selected card\n//\n//   ends player turn\n// }\n//\n// BARON\n// card.prototype.action3 = function(holderPlayer){\n//\n//   const selectedPlayer = gameView.askForPlayerChoice(); -- checks for active players and give list of said players, waits for user choice and returns that choice.\n//\n//   gameView.revealCard(selectedPlayer);\n//   if (selectedPlayer.card.cardNumber > holderPlayer.card.cardNumber)\n//   {holderPlayer.aliveStatus = false;}\n//   else if (selectedPlayer.card.cardNumber < holderPlayer.card.cardNumber)\n//   {selectedPlayer.aliveStatus = false;}\n//\n//   ends player turn\n// }\n//\n// HANDMAID\n// card.protoype.action4 = function(holderPlayer){\n//\n//   holderPlayer.protected = true;\n// }\n//\n// PRINCE\n// card.prototype.action5 = function(holderPlayer){\n//\n//   const selectedPlayer = gameView.askForPlayerChoice(); -- checks for active players and give list of said players, waits for user choice and returns that choice.\n//\n//   const drawnCard = deck.drawCard();\n//   if(selectedPlayer.card === princessCard){\n//     selectedPlayer.card.action8(selectedPlayer)\n//   }\n//   turn.discardCard(selectedPlayer);\n//   selectedPlayer.card = drawnCard;\n//\n//   ends player turn\n// }\n//\n//\n// KING\n// card.prototype.action6 = function(holderPlayer){\n//\n//   const selectedPlayer = gameView.askForPlayerChoice(); -- checks for active players and give list of said players, waits for user choice and returns that choice.\n//\n//   const holderPlayerCard = holderPlayer.card;\n//   const selectedPlayerCard = selectedPlayer.card;\n//\n//   holderPlayer.card = selectedPlayerCard;\n//   selectedPlayer.card = holderPlayerCard;\n//\n//   ends player turn\n// }\n//\n//\n// COUNTESS\n// card.prototype.action7 = function(holderPlayer){\n//\n//   ends player turn\n// }\n//\n//\n// PRINCESS\n// card.prototype.action8 = function(holderPlayer){\n//\n//   holderPlayer.aliveStatus = false;\n//\n//   ends player turn\n// }\n\n\n//# sourceURL=webpack:///./client/src/models/deck.js?");

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

eval("const Turn = function (activePlayer, gameView, deck, playerArray) {\n  this.secondCard = null;\n  this.activePlayer = activePlayer;\n  this.playerNumber = activePlayer.playerNumber;\n  this.activePlayer.protected = false;\n  this.gameView = gameView;\n  this.deck = deck;\n  this.playerArray = playerArray;\n  this.handCardNotUsed = true;\n  this.deckCardNotUsed = true;\n}\n\n\nTurn.prototype.playerIsActive = function (gameView) {\n  if(this.activePlayer.aliveStatus){\n    const messagebox = document.getElementById(\"message-box\");\n    messagebox.innerHTML = `Your turn \"${this.activePlayer.name}\" </br> Choose the card your wish to play!`;\n    gameView.showHandCard(this.activePlayer);\n    this.handCardNotUsed = true;\n  }\n  return this.activePlayer.aliveStatus;\n}\n\n\nTurn.prototype.getSecondCard = function (deck, gameView) {\n  this.secondCard = deck.drawCard();\n  gameView.showDeckCard(this.activePlayer, this.secondCard);\n  this.deckCardNotUsed = true;\n}\n\n\nTurn.prototype.activateCardChoiceEventListener = function (endOfGoFunctions) {\n  const playerNumber = this.playerNumber;\n  console.log(\"ActiveCardPickListener ON for player:\", playerNumber);\n  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);\n  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);\n\n  if (this.secondCard.character === \"King\" || this.secondCard.character === \"Prince\" && this.activePlayer.card.character === \"Countess\") {\n    handCardImage.addEventListener('click', () => { this.handImageHandler(endOfGoFunctions) });\n  }\n  else if (this.activePlayer.card.character === \"King\" || this.activePlayer.card.character === \"Prince \" && this.secondCard.character === \"Countess\" ) {\n    deckCardImage.addEventListener('click', () => { this.deckImageHandler(endOfGoFunctions) });\n  }\n  else {\n    handCardImage.addEventListener('click', () => {this.handImageHandler(endOfGoFunctions) });\n    deckCardImage.addEventListener('click', () => {this.deckImageHandler(endOfGoFunctions) });\n  }\n}\n\n\n// const handImageHandler = () => {\nTurn.prototype.handImageHandler = function (endOfGoFunctions) {\n  console.log(\"Turn of Player:\", this.playerNumber, \"Clicked hand card.\");\n  if (this.handCardNotUsed) {\n//    console.log('context of clicked image', this); // turnLogic is the context!\n    const playedCard = this.activePlayer.card;\n    const cardNumber = playedCard.value;\n    const action = this.deck.cardActions[`${cardNumber}`-1];\n    console.log(\"Player: \", this.playerNumber,\" Clicked Hand card.\");\n    action(this.activePlayer, this.gameView, this.playerArray, endOfGoFunctions);\n    // discard that card.\n    this.activePlayer.card = this.secondCard;\n    this.secondCard = null;\n    this.handCardNotUsed = false;\n    this.deckCardNotUsed = false;\n  };\n};\n\n\n// const deckImageHandler = () => {\nTurn.prototype.deckImageHandler = function (endOfGoFunctions) {\n  console.log(\"Turn of Player:\", this.playerNumber, \"Clicked deck card.\");\n  if (this.deckCardNotUsed) {\n    const playedCard = this.secondCard;\n    const cardNumber = playedCard.value;\n    const action = this.deck.cardActions[`${cardNumber}`-1]\n    console.log(\"Player: \", this.playerNumber,\" Clicked Deck card.\");\n    action(this.activePlayer, this.gameView, this.playerArray, endOfGoFunctions);\n    // discard that card.\n    this.secondCard = null;\n    this.handCardNotUsed = false;\n    this.deckCardNotUsed = false;\n  };\n};\n\n\nmodule.exports = Turn;\n\n\n//# sourceURL=webpack:///./client/src/models/turn.js?");

/***/ }),

/***/ "./client/src/runner.js":
/*!******************************!*\
  !*** ./client/src/runner.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SetUpHelper = __webpack_require__(/*! ./helpers/setup.js */ \"./client/src/helpers/setup.js\");\nconst GameView = __webpack_require__(/*! ./views/game_view.js */ \"./client/src/views/game_view.js\");\nconst Player = __webpack_require__(/*! ./models/player.js */ \"./client/src/models/player.js\");\nconst Turn = __webpack_require__(/*! ./models/turn.js */ \"./client/src/models/turn.js\");\n\nlet deck;\nlet initalRemovedCard;\nlet gameNotWon = true;\nlet playerArray = [];\nlet gameNotStarted = true;\nlet turnCounter = 0;\nlet skippedPlayer = 0;\nlet playerWon = null;\nconst gameView = new GameView();\n\n\nSetUpHelper.setUpDeck((finishedDeck) => {\n  deck = finishedDeck;\n  initalRemovedCard = deck.drawCard();\n});\n\n\nconst handleStartGameButton = function () {\n  if (gameNotStarted) {\n    playerArray =  SetUpHelper.setUpPlayers(deck, gameView);\n    console.log(playerArray);\n    playRound();\n    gameNotStarted = false;\n    const startButton = document.getElementById('start-button');\n    startButton.style.background = \"rgb(158, 147, 130)\";\n    startButton.style.color = \"#614d4d\";\n  }\n}\n\n\nconst handleGoEndButtonClick = function (event) {\n  if (event) {\n    console.log(\"ENDGOBUTTON was clicked by user\");\n    gameView.unShowCards(playerArray);\n    const goEndButton = document.getElementById(`${event.srcElement.id}`)\n    goEndButton.disabled = true;\n    goEndButton.style.background = \"rgb(158, 147, 130)\";\n  }\n  console.log(\"ENDGOBUTTON code setoff\");\n  if (skippedPlayer === 3) {\n    // END GAME winner is current active player who clicked button;\n    // logic to set playerWon to the last remaining active player.\n    // GAME END Notification!\n    console.log(\"SOME ONE WON! as all else are out\", playerWon);\n  } else if (deck.noCardsLeft) {\n    // logic to compare values of active players cards.\n    // GAME END Notification!\n    console.log(\"SOME ONE WON with higher card!\", playerWon);\n  } else {\n    if (turnCounter < 3) { turnCounter += 1;\n    } else { turnCounter = 0 };\n    playRound();\n  }\n} // end end-go-button click\n\n\nconst playRound = function () {\n  console.log(\"Round:\", turnCounter,\" kicked off!\");\n  const turnLogic = new Turn(playerArray[turnCounter], gameView, deck, playerArray);\n\n  if (turnLogic.playerIsActive(gameView)) {\n    turnLogic.getSecondCard(deck, gameView);\n    console.log(\"Turn of player:\", turnLogic.activePlayer.name);\n    // console.log(\"Hand card is:\", turnLogic.activePlayer.card.character);\n    // console.log(\"Deck card for their go: \", turnLogic.secondCard.character);\n\n    const endOfGo = function () {\n      const goEndButton = document.getElementById('end-go-button');\n      goEndButton.style.background = \"rgb(138, 218, 105)\";\n      goEndButton.disabled = false;\n    }\n    turnLogic.activateCardChoiceEventListener(endOfGo);\n    skippedPlayer = 0;\n  } else { // SKIP PLAYER AS THEY ARE DEAD - CURRENTLY NEED TO CLICK ENDGOBUTTON\n    handleGoEndButtonClick();  // BUT THIS NEEDS event passed in to get button id.\n    skippedPlayer += 1;\n  };\n\n  // if (turnCounter < 3) { turnCounter += 1;\n  // } else { turnCounter = 0 };\n} // end Round\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  const startButton = document.getElementById('start-button');\n  startButton.addEventListener('click', handleStartGameButton)\n\n  const goEndButton = document.getElementById('end-go-button');\n  goEndButton.addEventListener('click', (event) => {handleGoEndButtonClick(event)});\n  goEndButton.disabled = true;\n});\n\n\n\n\n\n\n\n// goEndButton.style.hover =\n// goEndButton.style.active =\n//\n// #end-go-button:hover {background-color: rgb(55, 221, 57)}\n// #end-go-button:active {\n// background-color: rgb(92, 231, 27);\n// box-shadow: 1px 2px #666;\n// transform: translateY(3px);\n// }\n\n\n//# sourceURL=webpack:///./client/src/runner.js?");

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

eval("const GameView = function () {\n}\n\nGameView.prototype.getPlayerName = function (playerNumber) {\n  const playerNameInput = document.getElementById(`player${playerNumber}-inputName`); //input html box where users can type name\n  const playerName = playerNameInput.value;\n  const playerNameBox = document.getElementById(`player${playerNumber}-nameBox`) // div that previously contained an input\n  playerNameBox.innerHTML = `<h1>${playerName}</h1>`; // change input to title using the name inputted.\n  return playerName;\n}\n\n\nGameView.prototype.renderLayout = function (arrayOfPlayers) {\n  // set up the space for cards\n  for (i = 1; i <5; i++) {\n    const playerHandCardImage = document.getElementById(`player${i}-handCardImage`);\n    playerHandCardImage.src = url(\"./client/public/images/lovelettercard.png\")\n  }\n}\n\n\nGameView.prototype.showHandCard = function (player) {\n  // Get player number from player then fill container for that player\n  console.log(\"showing hand cards of player:\", player.playerNumber);\n  const playerNumber = player.playerNumber;\n  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);\n  handCardImage.src = `./images/${player.card.character}.png`;\n}\n\n\nGameView.prototype.showDeckCard = function (player, secondCard) {\n  console.log(\"showing deck cards of player:\", player.playerNumber);\n  const playerNumber = player.playerNumber;\n  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);\n  deckCardImage.src = `./images/${secondCard.character}.png`;\n}\n\n\nGameView.prototype.unShowCards = function (playerArray) {\n  // Get player number from player then fill container for that player\n  console.log(\"UNSHOWING ALL CARDS\");\n  for (player of playerArray) {\n    const playerNumber = player.playerNumber;\n    const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);\n    handCardImage.src = `./images/lovelettercard.png`;\n    const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);\n    deckCardImage.src = `./images/blank.png`;\n  }\n}\n\n\nGameView.prototype.askForPlayerChoicePriest = function (holderPlayer, playerArray, endOfGoFunctions) {\n  const messagebox = document.getElementById(\"message-box\");\n  messagebox.innerHTML = `You played/discarded the Priest Card </br> ACTION: Choose the player you wish to SEE the card of:</br>`;\n  const playerChoiceSelector = document.createElement('select');\n  playerChoiceSelector.id = \"player-select\";\n  const submitChoice = document.createElement('button');\n  submitChoice.id = \"player-submit-button\";\n  submitChoice.textContent = \"Submit Player Choice!\"\n  let playerOptions = [];\n  for (player of playerArray){\n    if(player !== holderPlayer && player.aliveStatus && !player.protected) {\n      playerOptions.push(player);\n    } else { };\n  }\n  if (playerOptions.length === 0) {\n    messagebox.textContent = `You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round.`;\n  }\n  else {\n    for (player of playerOptions) {\n      const option = document.createElement('option');\n      option.textContent = player.name;\n      option.value = JSON.stringify(player);\n      playerChoiceSelector.appendChild(option);\n    }\n\n    const controlBox = document.getElementById('controls');\n    controlBox.appendChild(playerChoiceSelector);\n    controlBox.appendChild(submitChoice);\n    submitChoice.addEventListener('click', () => {\n      const chosenPlayerNumber =  JSON.parse(playerChoiceSelector.value).playerNumber;\n      console.log(\"Player \",holderPlayer.playerNumber, \"choose player:\", chosenPlayerNumber);\n      const chosenPlayer = playerArray[chosenPlayerNumber -1];\n      console.log(\"Chosen player is:\", chosenPlayer);\n      console.log(\"Their hand card is:\", chosenPlayer.card.value);\n      const messagebox = document.getElementById(\"message-box\");\n      messagebox.textContent = `You choose to see card of </br>\"${chosenPlayer.name}\". </br>Their card is ${chosenPlayer.card.character}`;\n      // turn.discardCard(selectedPlayer);\n      controlBox.removeChild(playerChoiceSelector);\n      controlBox.removeChild(submitChoice);\n      endOfGoFunctions();\n    });\n  }\n}\n\n\nGameView.prototype.askForPlayerChoiceGuard = function (holderPlayer, playerArray, endOfGoFunctions) {\n  const messagebox = document.getElementById(\"message-box\");\n  messagebox.innerHTML = `You played/discarded the Guard Card</br> ACTION: Choose the player you wish to guess the card of</br> and guess the card that player has.`;\n  const playerChoiceSelector = document.createElement('select');\n  playerChoiceSelector.id = \"player-select\";\n  const cardChoiceSelector = document.createElement('select');\n  cardChoiceSelector.id = \"card-select\";\n  const submitChoice = document.createElement('button');\n  submitChoice.id = \"choice-submit-button\";\n  submitChoice.textContent = \"Submit Choices!\"\n  let playerOptions = [];\n  for (player of playerArray){\n    if(player !== holderPlayer && player.aliveStatus && !player.protected) {\n      playerOptions.push(player);\n    } else { };\n  };\n  if (playerOptions.length === 0) {\n    messagebox.textContent = `You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round.`;\n  }\n  else {\n    for (player of playerOptions) {\n      const option = document.createElement('option');\n      option.textContent = player.name;\n      option.value = JSON.stringify(player);\n      playerChoiceSelector.appendChild(option);\n    }\n    for (let i = 2; i < 9; i++) {\n      const optionNum = document.createElement('option');\n      optionNum.textContent = i;\n      optionNum.value = i;\n      cardChoiceSelector.appendChild(optionNum);\n    }\n    const controlBox = document.getElementById('controls');\n    controlBox.appendChild(playerChoiceSelector);\n    controlBox.appendChild(cardChoiceSelector);\n    controlBox.appendChild(submitChoice);\n    submitChoice.addEventListener('click', () => {\n      const chosenPlayerNumber =  JSON.parse(playerChoiceSelector.value).playerNumber;\n      console.log(\"Player \",holderPlayer.playerNumber, \"choose player:\", chosenPlayerNumber);\n      console.log(\"And chose card number:\", cardChoiceSelector.value);\n      const chosenPlayer = playerArray[chosenPlayerNumber -1];\n      console.log(\"Chosen player is:\", chosenPlayer);\n      console.log(\"Their hand card is:\", chosenPlayer.card.value);\n      if (chosenPlayer.card.value === cardChoiceSelector.value){\n        chosenPlayer.aliveStatus = false;\n        const messagebox = document.getElementById(\"message-box\");\n        messagebox.textContent = `You guessed CORRECT!! </br>\"${chosenPlayer.name}\" is out of the game!`;\n        // turn.discardCard(selectedPlayer);\n      };\n      controlBox.removeChild(playerChoiceSelector);\n      controlBox.removeChild(cardChoiceSelector);\n      controlBox.removeChild(submitChoice);\n      console.log(\"Chosen player is alive still?: \", chosenPlayer.aliveStatus);\n      endOfGoFunctions();\n    });\n  }  /// THIS NEEDS TO GO BELOW ALL CHOICE AND SUBMIT BITS is the else closure for when\n  // all remaining players have handmaid\n\n} // end askForPlayerChoiceGuard\n\n\n// returns list of active players, waits for user choice and returns that choice.\nGameView.prototype.askForNumberChoice = function (holderPlayer) {\n\n};\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./client/src/views/game_view.js?");

/***/ })

/******/ });
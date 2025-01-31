const {loadGame } = require("./SaveManager");
const GameInitializer = require("./GameInitializer");
const GameLoop = require("./GameLoop");

function initializeNewGame() {
    return GameInitializer.initializeNewGame();
}

function gameLoop(player, dungeon, moveHandler) {
    GameLoop.start(player, dungeon, moveHandler);
}

function promptLoadGame() {
    return GameInitializer.promptLoadGame(loadGame);
}

module.exports = { initializeNewGame, promptLoadGame, gameLoop };

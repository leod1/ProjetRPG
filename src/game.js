// Si "Entrée" apparaît buggé ->
// chcp 65001 dans le terminal avant de lancer le jeu sur Windows

// Imports des modules
const readlineSync = require("readline-sync");
const { initializeNewGame, promptLoadGame, gameLoop } = require("./utils/GameSetup");

let player = null;
let dungeon = null;
let moveHandler = null;

// Demander à l'utilisateur s'il souhaite charger une partie au début
console.log("\nBienvenue dans le RPG Dungeon Explorer !");

const loadChoice = readlineSync.question("Voulez-vous charger une partie existante ? (O/N) : ").toUpperCase();
if (loadChoice === "O") {
    const result = promptLoadGame();
    if (result) {
        player = result.player;
        dungeon = result.dungeon;
        moveHandler = result.moveHandler;
    }
}

// Initialiser une nouvelle partie si aucune sauvegarde n'a été chargée
if (!player) {
    const result = initializeNewGame();
    player = result.player;
    dungeon = result.dungeon;
    moveHandler = result.moveHandler;
}

// Boucle de jeu
gameLoop(player, dungeon, moveHandler);
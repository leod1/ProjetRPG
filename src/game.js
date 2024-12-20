// Si "Entrée" apparaît buggé ->
// chcp 65001 dans le terminal avant de lancer le jeu

// Imports des modules
const readlineSync = require("readline-sync");
const { saveGame } = require("./utils/SaveManager");
const { initializeNewGame, promptLoadGame } = require("./utils/GameSetup");

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

if (!player) {
    const result = initializeNewGame();
    player = result.player;
    dungeon = result.dungeon;
    moveHandler = result.moveHandler;
}

// Boucle de jeu
while (true) {

    let counter = 0;

    if (counter === 0) {
        console.log("\n=== ACTIONS ===");
        console.log("Que voulez-vous faire ?");
        console.log("1. Se déplacer (N, S, E, O)");
        console.log("2. Consulter l'inventaire");
        console.log("3. Quitter le jeu");
        readlineSync.question("\nAppuyez sur Entrée pour continuer...");
    }

    console.clear();
    console.log("\n=== DONJON ===");
    dungeon.affichage();

    console.log("\n=== ACTIONS ===");
    console.log("1. Se déplacer (N, S, E, O)");
    console.log("2. Consulter l'inventaire");
    console.log("3. Charger une partie");
    console.log("4. Quitter le jeu");

    const choice = readlineSync.question("Entrez votre choix : ").toUpperCase();

    switch (choice) {
        case "N":
        case "S":
        case "E":
        case "O":
            try {
                moveHandler.execute(choice);
            } catch (error) {
                console.log(error.message);
            }
            break;

        case "2":
            console.log("\n=== INVENTAIRE ===");
            if (player.inventory.length === 0) {
                console.log("Votre inventaire est vide.");
            } else {
                console.log("Objets dans votre inventaire :");
                player.inventory.forEach((item, index) => {
                    console.log(`${index + 1}. ${item.name}`);
                });
            }
            readlineSync.question("\nAppuyez sur Entrée pour continuer...");
            break;

        case "3":
            if (player && dungeon) {
                const saveChoice = readlineSync.question("\nUne partie est en cours. Voulez-vous la sauvegarder ? (O/N) : ").toUpperCase();
                if (saveChoice === "O") {
                    saveGame(player, dungeon);
                }
            }
            const result = promptLoadGame();
            if (result) {
                player = result.player;
                dungeon = result.dungeon;
                moveHandler = result.moveHandler;
            }
            readlineSync.question("\nAppuyez sur Entrée pour continuer...");
            break;

        case "4":
            const saveChoice = readlineSync.question("\nVoulez-vous sauvegarder votre partie avant de quitter ? (O/N) : ").toUpperCase();
            if (saveChoice === "O") {
                saveGame(player, dungeon);
            }
            console.log("Merci d'avoir joué ! À bientôt.");
            process.exit(0);

        default:
            console.log("Choix invalide. Veuillez réessayer.");
            readlineSync.question("\nAppuyez sur Entrée pour continuer...");
    }

    counter++;
}
# SRP
GameSetup.js fait trop de chose, notamment gameLoop :

affichage, gestion des inputs, logique de jeu. À diviser en plusieurs classes.

# ISP
Créer des interfaces comme ICombattant, IInventoriable pour mieux séparer les responsabilités.

move.js contient de la duplication

Attention à la gestion des erreurs

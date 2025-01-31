# GROUPE :
## Léo Devaux et Elias Boez

## Projet RPG
#### Objectif

Les joueurs explorent un donjon généré aléatoirement, affrontent des monstres, et collectent des trésors tout en améliorant leurs compétences. Tout se fait via des commandes textuelles, et chaque tour de jeu permet au joueur de prendre des décisions simples : se déplacer, combattre, ramasser des objets, etc.


### Fonctionnalités de base (pour les premières itérations avec TDD)

1.  **Création du personnage**
    -   Le joueur commence par créer un personnage avec un nom et des statistiques de base (force, défense, santé, mana, etc.).
    -   Chaque joueur a un inventaire vide au départ et peut choisir une classe (guerrier, mage, voleur) qui influence ses capacités en combat.

#### Règles d'acceptance :

-   Le joueur doit pouvoir choisir un nom pour son personnage (limité à un certain nombre de caractères).
-   Les statistiques du personnage sont initialisées en fonction de sa classe (par exemple, le guerrier a plus de santé, le mage plus de mana, etc.).

**Tests** :

1.  **Test de création de personnage valide** : Vérifier que le personnage est bien créé avec un nom et les statistiques associées à la classe choisie.
2.  **Test de validation du nom** : Assurer que les noms invalides (par exemple, trop courts ou trop longs) ne sont pas acceptés.

2.  **Exploration du donjon**
    -   Le joueur peut explorer un donjon généré aléatoirement composé de salles interconnectées.
    -   Chaque salle peut contenir des monstres, des trésors ou être vide.
    -   Le joueur peut se déplacer vers le nord, sud, est, ou ouest pour changer de salle.

#### Règles d'acceptance :

-   Le donjon est généré avec un certain nombre de salles connectées aléatoirement.
-   Le joueur peut se déplacer entre les salles en choisissant une direction (nord, sud, est, ouest).
-   Si une salle contient un monstre, le joueur doit combattre avant de pouvoir se déplacer à nouveau.

**Tests** :

1.  **Test de génération de donjon** : Vérifier que le donjon contient un certain nombre de salles avec des connexions valides entre elles.
2.  **Test de déplacement** : Assurer que le joueur peut se déplacer dans le donjon et que les mouvements sont bien limités aux directions valides.
3.  **Test de rencontre avec un monstre** : Vérifier que le joueur est bien obligé d'affronter un monstre avant de quitter une salle qui en contient un.
  
3.  **Système de combat**
    -   Lorsqu'un joueur rencontre un monstre, un combat au tour par tour commence.
    -   Le joueur peut choisir d'attaquer, se défendre ou utiliser un objet de son inventaire.
    -   Le monstre attaque à son tour, et le combat continue jusqu'à ce que le joueur ou le monstre soit vaincu.

#### Règles d'acceptance :

-   Le joueur peut attaquer et infliger des dégâts en fonction de ses statistiques et de celles du monstre.
-   Le monstre riposte automatiquement après chaque tour de jeu.
-   Si le joueur ou le monstre tombe à 0 points de vie, le combat se termine.

**Tests** :

1.  **Test d'attaque** : Vérifier que le joueur inflige des dégâts corrects au monstre en fonction de ses statistiques.
2.  **Test de défense** : Vérifier que le joueur peut réduire les dégâts reçus en choisissant de se défendre.
3.  **Test de victoire/défaite** : Assurer que le combat se termine correctement si le joueur ou le monstre tombe à 0 points de vie.


4. **Gestion de l'inventaire et des objets**

-   Le joueur peut trouver des objets dans les salles ou après avoir vaincu des monstres (potions de soin, armes, armures, etc.).
-   Les objets peuvent être utilisés pendant ou hors des combats pour améliorer les statistiques du joueur ou restaurer sa santé.

#### Règles d'acceptance :

-   Le joueur peut ajouter des objets à son inventaire lorsqu'il les trouve.
-   Les objets consommables (comme les potions) peuvent être utilisés pendant les combats pour restaurer de la santé ou du mana.
-   Les objets comme les armes et les armures peuvent être équipés pour augmenter les statistiques du personnage.

**Tests** :

1.  **Test d'ajout d'objets à l'inventaire** : Vérifier que les objets trouvés sont correctement ajoutés à l'inventaire du joueur.
2.  **Test d'utilisation des objets** : Assurer que le joueur peut utiliser des potions pendant le combat et que leurs effets sont bien appliqués.
3.  **Test d'équipement d'armes/armures** : Vérifier que l'équipement d'objets modifie bien les statistiques du personnage.

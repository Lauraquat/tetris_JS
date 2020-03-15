// Définition du style et coordonnées d'une case
const CANVAS = document.getElementById("tetris");
const CTX = CANVAS.getContext("2d");

const LIGNE = 20;
const COLONNE = 10;
const CASE = 20;
const VACANT = "#FFFFFF"; // couleur d'une case vide

const SCORE = document.getElementById("score");

function drawCase(x, y, couleur) {
    CTX.fillStyle = couleur;
    CTX.fillRect(x * CASE, y * CASE, CASE, CASE);

    CTX.strokeStyle = "#000000";
    CTX.strokeRect(x * CASE, y * CASE, CASE, CASE);
}

// Création du plateau vide (20x10)
var plateau = [];
for (i = 0; i < LIGNE; i++) {
    plateau[i] = [];
    for (j = 0; j < COLONNE; j++) {
        plateau[i][j] = VACANT;
    }
}

// Affichage du plateau
function drawPlateau() {
    for (i = 0; i < LIGNE; i++) {
        for (j = 0; j < COLONNE; j++) {
            // on dessine une case sur chaque case du plateau
            drawCase(j, i, plateau[i][j]);
        }
    }
}

drawPlateau();



// génération aléatoire d'une forme
function randomForme() {
    var r = Math.floor(Math.random() * FORMES.length)

    // On récupère la forme (index )0) et sa couleur (index 1)  de manière aléatoire
    return new Forme(FORMES[r][0], FORMES[r][1]);
}

var f = randomForme();
var score = 0;


// Commandes
document.addEventListener("keydown", commande);

function commande(event) {
    if (event.keyCode == 37) {
        f.moveLeft();
        depart = Date.now();
    } else if (event.keyCode == 38) {
        f.rotate();
        depart = Date.now();
    } else if (event.keyCode == 39) {
        f.moveRight();
        depart = Date.now();
    } else if (event.keyCode == 40) {
        f.moveDown();
        depart = Date.now();
    }
}

// On descend la forme toutes les secondes
var depart = Date.now();
var isGameOver = false;

function drop() {
    var now = Date.now();
    var delta = now - depart;
    if (delta > 1000) {
        f.moveDown();
        depart = Date.now();
    }
    // si la partie n'est pas perdue, on relance la fonction drop() chaque secondes
    if (!isGameOver) {
        requestAnimationFrame(drop);
    }
}

function gameover() {
    // Si gameOver est true, on arrête le script
    isGameOver = true;

    alert("Vous avez perdu. Votre score est de " + score);
}

drop();
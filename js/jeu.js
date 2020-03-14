// Définition du style et coordonnées d'une case
const CANVAS = document.getElementById("tetris");
const CONTEXTE = CANVAS.getContext("2d");

const LIGNE = 20;
const COLONNE = 10;
const CASE = 20;
const VACANT = "#FFFFFF"; // couleur d'une case vide

function drawCase(x,y,couleur){
    CONTEXTE.fillStyle = couleur;
    CONTEXTE.fillRect(x*CASE,y*CASE,CASE,CASE);

    CONTEXTE.strokeStyle = "#000000";
    CONTEXTE.strokeRect(x*CASE,y*CASE,CASE,CASE);
}

// Création du plateau vide (20x10)
var plateau = [];
for( i = 0; i <LIGNE; i++){
    plateau[i] = [];
    for(j = 0; j < COLONNE; j++){
        plateau[i][j] = VACANT;
    }
}

// Affichage dy plateau
function drawPlateau(){
    for( i = 0; i <LIGNE; i++){
        for(j = 0; j < COLONNE; j++){
            drawCase(j,i,plateau[i][j]);
        }
    }
}

drawPlateau();

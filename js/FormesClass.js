const I = [
	[
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	],
	[
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
		[0, 0, 1, 0],
	],
	[
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
	],
	[
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
	]
];

const J = [
	[
		[1, 0, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 1],
		[0, 1, 0],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	]
];

const L = [
	[
		[0, 0, 1],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[1, 0, 0]
	],
	[
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 0]
	]
];

const O = [
	[
		[1,1],
		[1,1],
	]
];

const S = [
	[
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 0, 1]
	],
	[
		[0, 0, 0],
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[1, 0, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const T = [
	[
		[0, 1, 0],
		[1, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[0, 1, 0]
	]
];

const Z = [
	[
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	[
		[0, 0, 1],
		[0, 1, 1],
		[0, 1, 0]
	],
	[
		[0, 0, 0],
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
];

// Définition et colorisation des formes
const FORMES = [
    [I, "#7C16DC"],
    [J, "#15E2DC"],
    [L, "#CA07DE"],
    [O, "#126ED7"],
    [S, "#72AD0A"],
    [T, "#EE2D16"],
    [Z, "#FAA004"],
];


// Création d'un objet Forme
class Forme {
    constructor(forme, couleur) {
        this.forme = forme;
        this.couleur = couleur;
        this.firstForme = 0;
        this.activeForme = this.forme[this.firstForme];
        // On définit la 1ère forme au positionnement 3 ; -2 (-2 = en dehors du plateau)
        this.x = 3;
        this.y = -2;
    }

    // Détermination de la forme active
    fill(couleur) {
        for (i = 0; i < this.activeForme.length; i++) {
            for (j = 0; j < this.activeForme.length; j++) {
                // Définition des formes selon les coordonnées et la couleur
                if (this.activeForme[i][j]) {
                    drawCase(this.x + j, this.y + i, couleur);
                }
            }
        }
    }

    // Affichage des formes en remplissant les cases selon la couleur
    draw() {
        this.fill(this.couleur);
    }

    // Suppression des formes en colorant la case en blanc (case vide)
    unDraw() {
        this.fill(VACANT);
    }

    // Vérification des collisions
    collision(x, y, forme) {
        for (i = 0; i < forme.length; i++) {
            for (j = 0; j < forme.length; j++) {
                // la pièce ne va pas remplir cette case, on passe à la suivante
                if (!forme[i][j]) {
                    continue;
                }
                // Détermination des nouvelles coordonnées
                // this.x = position actuelle sur le plateau
                // j = case de la pièce en cours selon sa forme et sa rotation
                // x = éventuel décalage pour vérifier une case adjacente
                var newX = this.x + j + x;
                var newY = this.y + i + y;
                
                // on est hors du plateau
                if (newX < 0 || newX >= COLONNE || newY >= LIGNE) {
                    return true;
                }

                if (newY < 0) {
                    continue;
                }
                
                // S'il y a une case non vacante sur les nouvelles coordonnées, on renvoie true (il y a collision)
                if (plateau[newY][newX] != VACANT) {
                    return true;
                }
            }
        }
        // si tout va bien et qu'il n'y a pas de collision
        return false;
    }
    
    // Déplacement de la forme vers le bas
    // Utilisation de la methode collision pour déterminer si les formes se touchent ou non
    moveDown() {
		if (isGameOver) {
			return;
		}

        if (!this.collision(0, 1, this.activeForme)) {
            // si les formes ne se touchent pas, 
            // on applique la méthode unDraw, on descend d'une case et on applique la méthode draw
            this.unDraw();
            this.y++;
            this.draw();
        }
        else {
            // Sinon, on verrouille la forme et on en relance une aléatoirement
            this.lock();
            f = randomForme();
        }
    }

    // Déplacement de la forme vers la droite
    moveRight() {
        if (!this.collision(1, 0, this.activeForme)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    // Déplacement de la forme vers la gauche
    moveLeft() {
        if (!this.collision(-1, 0, this.activeForme)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    // Rotation de la forme
    rotate() {
        // on définit la prochaine rotation.
        // On utilise le modulo pour retourner à 0 quand toutes les rotations ont été faites
        var nextForme = this.forme[(this.firstForme + 1) % this.forme.length];
        var kick = 0;
		
		// On décale la pièce à droite ou à gauche si on est trop près du bord
		// Cela permet de faire la rotation en évitant les collisions
        if (this.collision(0, 0, nextForme)) {
            if (this.x > COLONNE / 2) {
                // On décalle vers la gauche si on est contre le bord droit
                kick = -1; 
            }
            else {
                // On décalle vers la droite si on est contre le bord gauche
                kick = 1;
            }
        }

        if (!this.collision(kick, 0, nextForme)) {
            // si la rotation est possible dans collision, on effectue la rotation
            this.unDraw();
            this.x += kick;
            this.firstForme = (this.firstForme + 1) % this.forme.length;
            this.activeForme = this.forme[this.firstForme];
            this.draw();
        }
    }

    // Verrouillage de la forme à sa place définitive
    lock() {
        for (i = 0; i < this.activeForme.length; i++) {
            for (j = 0; j < this.activeForme.length; j++) {
                if (!this.activeForme[i][j]) {
                    continue;
                }
                // Si on veut verrouiller une pièce en dehors du plateau, c'est gameover
                if (this.y + i < 0) {
					gameover();
                    break;
                }
                // On verrouille la pièce à sa position finale, en remplissant la couleur concernée
                plateau[this.y + i][this.x + j] = this.couleur;
            }
        }

        // Suppression des lignes complètes
        for (i = 0; i < LIGNE; i++) {
            var ligneComplete = true;
            for (j = 0; j < COLONNE; j++) {
                // Pour chaque ligne qui ne comporte plus de case vacante
                ligneComplete = ligneComplete && (plateau[i][j] != VACANT);
            }
            if (ligneComplete) {
                // Si une ligne est complète, on la supprime
                for (var y = i; y > 1; y--) {
                    for (j = 0; j < COLONNE; j++) {
                        plateau[y][j] = plateau[y - 1][j];
                    }
                }
                // On créé une nouvelle ligne vide en haut du plateau
                for (j = 0; j < COLONNE; j++) {
                    plateau[0][j] = VACANT;
                }
                // Puis on incrémente le score de 100
                score += 100;
            }
        }

        // On dessine le nouveau plateau
        drawPlateau();
        // On met à jour le score
        SCORE.innerHTML = score;
    }
}
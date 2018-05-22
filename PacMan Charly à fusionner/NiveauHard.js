//? chaque reload
window.addEventListener('load', function () {
// On r?cup?re l'objet canvas
var elem = document.getElementById('canvasElem');
if (!elem || !elem.getContext) {
	return;
	}
	// On r?cup?re le contexte 2D
	context = elem.getContext('2d');
    if (!context) {
		return;
		} 
	// Boucle de rafraichissement du contexte 2D
	boucleJeu = setInterval(refreshGame, intervalTemps); //refresh tous les x ms
	}, false);
	
	//variables internes
var boucleJeu; //appel?e pour refresh
var intervalTemps =50; //temps entre 2 refresh en ms
var context; //le contexte 2d
 
// Constantes du jeu
var largeur_fenetre = 1600; //taille du canvas
var hauteur_fenetre = 900; //hauteur du canvas
var pas=31;

//taille de Pacman
var pactaille=32;
//Coordonn?es de pacman
var xplay=0;
var yplay=0;

//Coordonn?es Centre de collision
var collix=xplay+10;
var colly=yplay+10;

var direction=5;

var stop=true;

var imgniv= new Image();
imgniv.src='lvl_classic.png';

var ferme=true;

//variables pour la vitesse du perso
count=0;
var speed=1;

//Variable des sprites
	var spriteWidth=422; //largeur de la spritesheet
	var spriteHeight=105; //hauteur de la spritesheet

	var singleSpriteWidth=105; //largeur d'une sprite
	var singleSpriteHeight=105; //hauteur d'une sprite

	//Nombre de sprites dans la spritesheet
	var currentFrame=0; //sprite actuel
	var frameCount=4; //nombre de sprites

	//Coordonn?es pour le rendu du sprite
	var x=0;
	var y=0;

	//Coordonn?es pour la spritesheet
	var srcx=0;
	var srcy=0;

	//On cr?e une variable dans laquelle la spritesheet sera stock?e
	var pacman= new Image();
	pacman.src='pacsprite.png';
	
	var pomme=new Image();
	pomme.src='pomme.png';
	var fraise=new Image();
	fraise.src='fraise.png';
	var cerise=new Image();
	cerise.src='cerise.png';
	var orange=new Image();
	orange.src='orange.png';
	var melon=new Image();
	melon.src='melon.png';
	var galaga=new Image();
	galaga.src='galaga.png';
	var cloche=new Image();
	cloche.src='cloche.png';
	var clef=new Image();
	clef.src='cl?.png';
	var Blinky=new Image();
	Blinky.src='Blinky.png';
	var Pinky=new Image();
	Pinky.src='Pinky.png';
	var Inky=new Image();
	Inky.src='Inky.png';
	var Clyde=new Image();
	Clyde.src='clyde.png';
	var fruit=0;
	
	var angle=0;
	
//Tilemap (conception du niveau)
var ltile=27;
var htile=50;
var tileMap = new Array();
tileMap=[
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
[1,3,1,1,3,1,3,1,1,1,3,1,3,1,1,3,1,1,3,1,1,3,1,1,1,1,1,1,3,1,1,3,1,1,3,1,1,3,1,3,1,1,1,3,1,3,1,1,3,1],
[1,3,1,4,3,1,3,3,3,3,3,1,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,1,3,3,3,3,3,1,3,4,1,3,1],
[1,3,3,3,1,1,1,1,1,3,1,1,1,1,1,3,1,1,1,1,3,1,1,3,1,1,3,1,1,3,1,1,1,1,3,1,1,1,1,1,3,1,1,1,1,1,3,3,3,1],
[1,3,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,3,3,3,3,3,1,1,3,3,3,3,3,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,3,1],
[1,3,1,1,1,3,1,1,1,1,1,3,1,1,1,1,3,1,3,3,1,1,3,1,1,1,1,3,1,1,3,3,1,3,1,1,1,1,3,1,1,1,1,1,3,1,1,1,3,1],
[1,3,3,3,3,3,1,1,1,1,1,3,3,3,3,1,3,3,3,1,1,1,3,3,3,3,3,3,1,1,1,3,3,3,1,3,3,3,3,1,1,1,1,1,3,3,3,3,3,1],
[1,3,1,3,1,3,1,1,1,1,1,3,1,1,3,1,3,1,3,3,1,1,3,1,1,1,1,3,1,1,3,3,1,3,1,3,1,1,3,1,1,1,1,1,3,1,3,1,3,1],
[1,3,3,3,1,3,3,3,3,3,3,3,3,3,3,1,3,1,1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,3,1,3,3,3,3,3,3,3,3,3,3,1,3,3,3,1],
[5,3,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,3,6],
[1,3,1,3,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,0,0,0,0,8,0,0,0,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,3,1,3,1],
[1,3,3,3,3,1,1,1,3,1,1,1,1,1,1,3,1,1,3,1,1,0,1,7,7,7,7,1,0,1,1,3,1,1,3,1,1,1,1,1,1,3,1,1,1,3,3,3,3,1],
[1,1,1,1,3,3,3,3,3,3,3,3,3,1,1,3,1,1,3,3,3,0,1,9,10,11,0,1,0,3,3,3,1,1,3,1,1,3,3,3,3,3,3,3,3,3,1,1,1,1],
[1,1,1,3,3,1,3,1,1,1,1,1,3,3,3,3,3,3,3,1,1,0,1,1,1,1,1,1,0,1,1,3,3,3,3,3,3,3,1,1,1,1,1,3,1,3,3,1,1,1],
[1,3,3,3,1,1,3,1,3,3,3,1,3,1,1,1,1,1,3,1,1,0,0,0,0,12,0,0,0,1,1,3,1,1,1,1,1,3,1,3,3,3,1,3,1,1,3,3,3,1],
[5,3,1,1,1,1,3,1,3,1,3,3,3,3,3,3,3,1,3,3,3,1,1,1,1,3,1,1,1,3,3,3,1,3,3,3,3,3,3,3,1,3,1,3,1,1,1,1,3,6],
[1,3,3,3,3,1,3,3,3,3,1,1,3,1,1,1,3,3,3,1,3,1,3,1,1,3,1,3,1,3,1,3,3,3,1,1,1,3,1,1,3,3,3,3,1,3,3,3,3,1],
[1,3,1,3,1,1,1,3,1,3,1,1,3,1,1,1,3,1,3,1,3,3,3,1,3,2,1,3,3,3,1,3,1,1,1,1,1,3,1,1,3,1,3,1,1,1,3,1,3,1],
[1,3,1,3,3,3,3,3,1,3,3,3,3,3,3,3,3,1,3,1,3,1,3,1,3,1,1,3,1,3,1,3,1,3,3,3,3,3,3,3,3,1,3,3,3,3,3,1,3,1],
[1,3,1,1,1,3,1,1,1,1,1,3,1,1,3,1,3,3,3,1,3,3,3,3,3,3,3,3,3,3,1,3,3,3,1,3,1,1,3,1,1,1,1,1,3,1,1,1,3,1],
[1,3,1,3,3,3,3,3,3,3,3,3,3,3,3,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,3,3,3,3,3,3,3,3,3,3,3,3,1,3,1],
[1,3,1,3,1,1,3,1,1,1,3,1,3,1,3,1,3,3,3,3,3,3,3,1,1,1,1,3,3,3,3,3,3,3,1,3,1,3,1,3,1,1,1,3,1,1,3,1,3,1],
[1,3,3,3,1,1,3,1,1,1,3,1,1,1,3,1,1,1,3,1,1,1,3,3,3,3,3,3,1,1,1,3,1,1,1,3,1,1,1,3,1,1,1,3,1,1,3,3,3,1],
[1,3,1,4,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,4,1,3,1],
[1,3,1,1,3,1,3,1,1,3,1,1,1,1,1,1,3,1,1,1,1,3,1,1,1,1,1,1,3,1,1,1,1,3,1,1,1,1,1,1,3,1,1,3,1,3,1,1,3,1],
[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
//0=vide	;	1=Mur	;	2=Joueur	;	3=Pac-Gomme		;	4=Super Pac-Gomme	;	5=t?l?portation gauche	;	6=t?l?portation droite	;	7=Porte fant?mes
//8=Blinky	;	9=Pinky	;	10=Inky		;	11=Clyde		;	12=G?n?rateur de bonus al?atoire
var posX=0;
var posY=0;

var posXBlinky=0;
var posYBlinky=0;

var posXPinky=0;
var posYPinky=0;

var posXInky=0;
var posYInky=0;

var posXClyde=0;
var posYClyde=0;

var restartMap = new Array();
restartMap=[
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
[1,3,1,1,3,1,3,1,1,1,3,1,3,1,1,3,1,1,3,1,1,3,1,1,1,1,1,1,3,1,1,3,1,1,3,1,1,3,1,3,1,1,1,3,1,3,1,1,3,1],
[1,3,1,4,3,1,3,3,3,3,3,1,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,1,3,3,3,3,3,1,3,4,1,3,1],
[1,3,3,3,1,1,1,1,1,3,1,1,1,1,1,3,1,1,1,1,3,1,1,3,1,1,3,1,1,3,1,1,1,1,3,1,1,1,1,1,3,1,1,1,1,1,3,3,3,1],
[1,3,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,3,3,3,3,3,1,1,3,3,3,3,3,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,3,1],
[1,3,1,1,1,3,1,1,1,1,1,3,1,1,1,1,3,1,3,3,1,1,3,1,1,1,1,3,1,1,3,3,1,3,1,1,1,1,3,1,1,1,1,1,3,1,1,1,3,1],
[1,3,3,3,3,3,1,1,1,1,1,3,3,3,3,1,3,3,3,1,1,1,3,3,3,3,3,3,1,1,1,3,3,3,1,3,3,3,3,1,1,1,1,1,3,3,3,3,3,1],
[1,3,1,3,1,3,1,1,1,1,1,3,1,1,3,1,3,1,3,3,1,1,3,1,1,1,1,3,1,1,3,3,1,3,1,3,1,1,3,1,1,1,1,1,3,1,3,1,3,1],
[1,3,3,3,1,3,3,3,3,3,3,3,3,3,3,1,3,1,1,3,3,3,3,3,3,3,3,3,3,3,3,1,1,3,1,3,3,3,3,3,3,3,3,3,3,1,3,3,3,1],
[5,3,1,3,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,3,1,1,3,1,3,6],
[1,3,1,3,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,0,0,0,0,8,0,0,0,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,3,1,3,1],
[1,3,3,3,3,1,1,1,3,1,1,1,1,1,1,3,1,1,3,1,1,0,1,7,7,7,7,1,0,1,1,3,1,1,3,1,1,1,1,1,1,3,1,1,1,3,3,3,3,1],
[1,1,1,1,3,3,3,3,3,3,3,3,3,1,1,3,1,1,3,3,3,0,1,9,10,11,0,1,0,3,3,3,1,1,3,1,1,3,3,3,3,3,3,3,3,3,1,1,1,1],
[1,1,1,3,3,1,3,1,1,1,1,1,3,3,3,3,3,3,3,1,1,0,1,1,1,1,1,1,0,1,1,3,3,3,3,3,3,3,1,1,1,1,1,3,1,3,3,1,1,1],
[1,3,3,3,1,1,3,1,3,3,3,1,3,1,1,1,1,1,3,1,1,0,0,0,0,12,0,0,0,1,1,3,1,1,1,1,1,3,1,3,3,3,1,3,1,1,3,3,3,1],
[5,3,1,1,1,1,3,1,3,1,3,3,3,3,3,3,3,1,3,3,3,1,1,1,1,3,1,1,1,3,3,3,1,3,3,3,3,3,3,3,1,3,1,3,1,1,1,1,3,6],
[1,3,3,3,3,1,3,3,3,3,1,1,3,1,1,1,3,3,3,1,3,1,3,1,1,3,1,3,1,3,1,3,3,3,1,1,1,3,1,1,3,3,3,3,1,3,3,3,3,1],
[1,3,1,3,1,1,1,3,1,3,1,1,3,1,1,1,3,1,3,1,3,3,3,1,3,2,1,3,3,3,1,3,1,1,1,1,1,3,1,1,3,1,3,1,1,1,3,1,3,1],
[1,3,1,3,3,3,3,3,1,3,3,3,3,3,3,3,3,1,3,1,3,1,3,1,3,1,1,3,1,3,1,3,1,3,3,3,3,3,3,3,3,1,3,3,3,3,3,1,3,1],
[1,3,1,1,1,3,1,1,1,1,1,3,1,1,3,1,3,3,3,1,3,3,3,3,3,3,3,3,3,3,1,3,3,3,1,3,1,1,3,1,1,1,1,1,3,1,1,1,3,1],
[1,3,1,3,3,3,3,3,3,3,3,3,3,3,3,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,3,3,3,3,3,3,3,3,3,3,3,3,1,3,1],
[1,3,1,3,1,1,3,1,1,1,3,1,3,1,3,1,3,3,3,3,3,3,3,1,1,1,1,3,3,3,3,3,3,3,1,3,1,3,1,3,1,1,1,3,1,1,3,1,3,1],
[1,3,3,3,1,1,3,1,1,1,3,1,1,1,3,1,1,1,3,1,1,1,3,3,3,3,3,3,1,1,1,3,1,1,1,3,1,1,1,3,1,1,1,3,1,1,3,3,3,1],
[1,3,1,4,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,4,1,3,1],
[1,3,1,1,3,1,3,1,1,3,1,1,1,1,1,1,3,1,1,1,1,3,1,1,1,1,1,1,3,1,1,1,1,3,1,1,1,1,1,1,3,1,1,3,1,3,1,1,3,1],
[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var X=0;
var Y=0;

var score=0;

var Secondes=0;
var Minutes=0;

var start=false;

var chrono=setInterval(compteur,1000);
var pacVit=setInterval(vitJoueur,120);
var blinkyVit=setInterval(vitBlinky,vitfantometestvalue());
var pinkyVit=setInterval(vitPinky,vitfantometestvalue());
var inkyVit=setInterval(vitInky,vitfantometestvalue());
var clydeVit=setInterval(vitClyde,vitfantometestvalue());
var tuBouges=true;

var pseudo="";
var insererPseudo=false;

var cool=setInterval(decompte,1000);
var vitfantomevalue;


function vitfantometestvalue(){
	
	return vitfantomevalue=100;
	
}

function vitfantome(){
	
	if (apres>avant){
		
	 vitfantomevalue=vitfantomevalue-220;
		
		avant=avant+1
		
		
	}
	
	else {
		
		
	}
	
}

var genererFruit=setInterval(bonusFruit,40000);
var check=false;

var niveau=1; //niveau actuel

var vies=3; // Nombre de vies
var scorevies=0;

var nombreGomme=0; // Compte le nombre de pac-gommes existantes sur le terrain

var superPac=false; //Pacman est-il en mode super Pacman?

var startBlinky=3;
var directionBlinky=5;

var startPinky=3;
var directionPinky=5;

var startInky=3;
var directionInky=5;

var startClyde=3;
var directionClyde=5;

var cooldown=0;
var wakawaka=new Audio("Wakawaka.mp3");
wakawaka.loop=true;

var verif=false;
var verif2=false;
var verif3=false;
var verif4=false;
var blinkyBouge=false;
var pinkyBouge= false;
var inkyBouge=false;
var clydeBouge=false;

function refreshGame() {
	if (insererPseudo==false){
	pseudo = window.prompt("Quel est votre pseudo?");
	insererPseudo=true;
}
else{
	
}
context.fillStyle = 'rgba(0,0,0,0.6)';
context.fillRect(0,0,largeur_fenetre,hauteur_fenetre);
checkStartGenerator();
testTile();
dessinerScore();
dessinerTemps();
dessinerStart();
window.document.onkeydown = dirPac;
deplacePac();
deplaceBlinky();
deplacePinky();
deplaceInky();
deplaceClyde();
indicNiveau();
dessinerVies();
vitfantome();
superPacman();
checkFin();
checkFin2();
actualiser();
if (verif==false){
	dirBlinky();
	verif=true;
}

if (verif2==false){
	dirPinky();
	verif2=true;
	
}

if (verif3==false){
	dirInky();
	verif3=true;
}

if (verif4==false){
	dirClyde();
	verif4=true;
	
}
}




/*
Les fonctions du jeu....
*/

var l=16;
var h=16;
	
function dessinerPacGomme(x2,y2)
{
context.beginPath();
context.fillStyle='khaki';
context.lineWidth="4";
context.strokeStyle='darkkhaki';
context.arc(x2+16, y2+16, 4, 0, 2 * Math.PI);
context.closePath();
context.stroke();
context.fill();
}

function dessinerGrossePacGomme(x3,y3){
context.beginPath();
context.fillStyle='khaki';
context.lineWidth="4";
context.strokeStyle='darkkhaki';
context.arc(x3+16, y3+16, 7, 0, 2 * Math.PI);
context.closePath();
context.stroke();
context.fill();
	
}

function dirPac (e){
	start=true;
	if ((e.keyCode==38) && (tileMap[j-1][i]!=1))//up
	{
		direction=3;
	}
	
	else if (e.keyCode==40)//bottom
	{
		direction=1;
		
	}
	
	else if (e.keyCode==39)//right
	{
		direction=2;
		
	}
	
	else if (e.keyCode==37)//left
	{
		direction=0;
		
	}
}

function deplacePac(){
if (tuBouges==true){
	angle=180;
	if (direction==0){
		if (tileMap[posX][posY-1]==1)
		{
			stop=true;
			tuBouges=false;
			wakawaka.pause();
			wakawaka.load();
		}
		
		else if (tileMap[posX][posY-1]==3)
		{
		score=score+10;
		scorevies=scorevies+10;
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		wakawaka.play();
		}
		
		else if (tileMap[posX][posY-1]==8)
		{
			if (superPac==false){
				
				dead=true;
			    wakawaka.pause();
			    wakawaka.load();
			
			}
			
			else if (superPac==true){
				
			tileMap[posX][posY-1]==2;
			tileMap[posX][posY]==3;
				
			restartBlinky();
			wakawaka.play();
			}
		
		}
		
		else if (tileMap[posX][posY-1]==9)
		{
			
			if (superPac==false){
				
				dead=true;
				wakawaka.pause();
			    wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX][posY-1]==2;
			tileMap[posX][posY]==3;
				
			restartPinky();
			wakawaka.pause();
			wakawaka.load();
			    
			}
		
		}
		
		else if (tileMap[posX][posY-1]==10)
		{
			
			if (superPac==false){
				
				dead=true;
				wakawaka.pause();
			    wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX][posY-1]==2;
			tileMap[posX][posY]==3;
				
			restartInky();
			wakawaka.play();
			    
			}
		
		}
		
		else if (tileMap[posX][posY-1]==11)
		{
			
			if (superPac==false){
				
				dead=true;
				wakawaka.pause();
		    	wakawaka.load();
			}
			
			else if (superPac==true){
			
			tileMap[posX][posY-1]==2;
			tileMap[posX][posY]==3;
			
			restartClyde();
			wakawaka.play();
			}
		
		}
		
		
		else if (tileMap[posX][posY-1]==5){
		tileMap[posX][ltile-3]=2;	
		tileMap[posX][posY]=0;
		tuBouges=false;
		wakawaka.pause();
		wakawaka.load();
		}
		
		else if (tileMap[posX][posY-1]==12){
			wakawaka.play();
			if (fruit==0){
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
			}
			else if (fruit==1){
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+5000;
		scorevies=scorevies+5000;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+3000;
		scorevies=scorevies+3000;
		fruit=0;
			}
			else if (fruit==3){
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+2000;
		scorevies=scorevies+2000;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+1000;
		scorevies=scorevies+1000;
		fruit=0;				
				
			}			
			else if (fruit==5){
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+700;
		scorevies=scorevies+700;
		fruit=0;				
			}			
			else if (fruit==6){
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+500;
		scorevies=scorevies+500;
		fruit=0;				
			}			
			else if (fruit==7){
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+300;
		scorevies=scorevies+300;
		fruit=0;				
			}
			else if (fruit==8){
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+100;
		scorevies=scorevies+100;
		fruit=0;				
				
			}
			
			
		}
		
		else if (tileMap[posX][posY-1]==4)
		{
		score=score+50;
		scorevies=scorevies+50;
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		superPac=true;
		wakawaka.play();
		cooldown=10;
		}
		
		else
		{	
		stop=false;
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		wakawaka.pause();
		wakawaka.load();
		}
		
	}
	
	
	
	else if (direction==1){
		angle=90;
		if ((tileMap[posX+1][posY]==1) || (tileMap[posX+1][posY]==7)){
			stop=true;
			tuBouges=false;
			wakawaka.pause();
			wakawaka.load();
		}
		else if (tileMap[posX+1][posY]==3){
		score=score+10;
		scorevies=scorevies+10;
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		wakawaka.play();
		}
		
		else if (tileMap[posX+1][posY]==8){
			
			if (superPac==false){
				
				dead=true;
			    wakawaka.pause();
			    wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX+1][posY]==2;
			tileMap[posX][posY]==3;
				
			restartBlinky();
			wakawaka.play();
			    
			}
			
		}
		
		else if (tileMap[posX+1][posY]==9){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX+1][posY]==2;
			tileMap[posX][posY]==3;
				
			restartPinky();
			wakawaka.play();
			}
			
		}
		
		else if (tileMap[posX+1][posY]==10){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX+1][posY]==2;
			tileMap[posX][posY]==3;
				
			restartInky();
			wakawaka.play();
			}
			
		}
		
		else if (tileMap[posX+1][posY]==11){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX+1][posY]==2;
			tileMap[posX][posY]==3;
		
			restartClyde();
			wakawaka.play();
			}
			
		}
		
		else if (tileMap[posX+1][posY]==12){
			wakawaka.play();
			if (fruit==0){
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
			}
			else if (fruit==1){
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+5000;
		scorevies=scorevies+5000;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+3000;
		scorevies=scorevies+3000;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+2000;
		scorevies=scorevies+2000;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+1000;
		scorevies=scorevies+1000;
		fruit=0;				
				
			}			
			else if (fruit==5){
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+700;
		scorevies=scorevies+700;
		fruit=0;				
			}			
			else if (fruit==6){
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+500;
		scorevies=scorevies+500;
		fruit=0;				
			}			
			else if (fruit==7){
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+300;
		scorevies=scorevies+300;
		fruit=0;				
			}
			else if (fruit==8){
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+100;
		scorevies=scorevies+100;
		fruit=0;				
				
			}
			
			
		}
		
		else if (tileMap[posX+1][posY]==4)
		{
		score=score+50;
		scorevies=scorevies+50;
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		superPac=true;
		wakawaka.play();
		cooldown=10;
		}
		
		else{
		stop=false;
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		wakawaka.pause();
		wakawaka.load();
		}
		
		}
		
		
		
		
	else if (direction==2){
		angle=0;
		if (tileMap[posX][posY+1]==1){
			stop=true;
			tuBouges=false;
			wakawaka.pause();
			wakawaka.load();
		}
		else if (tileMap[posX][posY+1]==3){
		score=score+10;
		scorevies=scorevies+10;
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		wakawaka.play();
		}
		
		else if (tileMap[posX][posY+1]==8){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX][posY+1]==2;
			tileMap[posX][posY]==3;
				
			restartBlinky();
            wakawaka.play();
			}
			
		}
		
		else if (tileMap[posX][posY+1]==9){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX][posY+1]==2;
			tileMap[posX][posY]==3;
				
			restartPinky();
			wakawaka.play();
			    
			}
			
		}
		
		else if (tileMap[posX][posY+1]==10){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX][posY+1]==2;
			tileMap[posX][posY]==3;
				
			restartInky();
			wakawaka.play();
			}
			
		}
		
		else if (tileMap[posX][posY+1]==11){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX][posY+1]==2;
			tileMap[posX][posY]==3;
				
			restartClyde();
            wakawaka.play();
			}
			
		}
		
		else if (tileMap[posX][posY+1]==6){
		tileMap[posX][1]=2;	
		tileMap[posX][posY]=0;
		tuBouges=false;
			wakawaka.pause();
			wakawaka.load();
		}
		
		else if (tileMap[posX][posY+1]==12){
			wakawaka.play();
			if (fruit==0){
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
			}
			else if (fruit==1){
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+5000;
		scorevies=scorevies+5000;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+3000;
		scorevies=scorevies+3000;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+2000;
		scorevies=scorevies+2000;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+1000;
		scorevies=scorevies+1000;
		fruit=0;				
				
			}			
			else if (fruit==5){
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+700;
		scorevies=scorevies+700;
		fruit=0;				
			}			
			else if (fruit==6){
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+500;
		scorevies=scorevies+500;
		fruit=0;				
			}			
			else if (fruit==7){
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+300;
		scorevies=scorevies+300;
		fruit=0;
			}
			else if (fruit==8){
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+100;
		scorevies=scorevies+100;
		fruit=0;
				
			}
			
			
		}
		
		else if (tileMap[posX][posY+1]==4)
		{
		score=score+50;
		scorevies=scorevies+50;
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		superPac=true;
		wakawaka.play();
		cooldown=10;
		}

		else{
		stop=false;
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		wakawaka.pause();
		wakawaka.load();
		}
		
		}
		
		
		
		
	else if (direction==3){
		angle=270;
		if (tileMap[posX-1][posY]==1){
			stop=true;
			tuBouges=false;
			wakawaka.pause();
			wakawaka.load();
		}
		else if (tileMap[posX-1][posY]==3){
		score=score+10;
		scorevies=scorevies+10;
		tileMap[posX-1][posY]=2;	
		tileMap[posX][posY]=0;
		tuBouges=false;
		wakawaka.play();
		}
		
		else if (tileMap[posX-1][posY]==8){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX-1][posY]==2;
			tileMap[posX][posY]==3;
				
			restartBlinky();
			wakawaka.play();
			}
			
		}
		
		else if (tileMap[posX-1][posY]==9){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
			
			tileMap[posX-1][posY]==2;
			tileMap[posX][posY]==3;
			
			restartPinky();
			wakawaka.play();
			}
			
		}
		
		else if (tileMap[posX-1][posY]==10){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX-1][posY]==2;
			tileMap[posX][posY]==3;
				
			restartInky();
			wakawaka.play();
			}
			
		}
		
		else if (tileMap[posX-1][posY]==11){
			
			if (superPac==false){
				
				dead=true;
			wakawaka.pause();
			wakawaka.load();
			}
			
			else if (superPac==true){
				
			tileMap[posX-1][posY]==2;
			tileMap[posX][posY]==3;
				
			restartClyde();
			wakawaka.play();
			}
			
		}
		
		else if (tileMap[posX-1][posY]==12){
			wakawaka.play();
			if (fruit==0){
		tileMap[posX-1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
			}
			else if (fruit==1){
		tileMap[posX-1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+5000;
		scorevies=scorevies+5000;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posX-1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+3000;
		scorevies=scorevies+3000;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posX-1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+2000;
		scorevies=scorevies+2000;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posX-1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+1000;
		scorevies=scorevies+1000;
		fruit=0;				
				
			}			
			else if (fruit==5){
		tileMap[posX-1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+700;
		scorevies=scorevies+700;
		fruit=0;				
			}			
			else if (fruit==6){
		tileMap[posX-1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+500;
		scorevies=scorevies+500;
		fruit=0;				
			}			
			else if (fruit==7){
		tileMap[posX-1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+300;
		scorevies=scorevies+300;
		fruit=0;				
			}
			else if (fruit==8){
		tileMap[posX-1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		score=score+100;
		scorevies=scorevies+100;
		fruit=0;				
				
			}
			
			
		}

		else if (tileMap[posX-1][posY]==4)
		{
		score=score+50;
		scorevies=scorevies+50;
		tileMap[posX-1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		superPac=true;
		wakawaka.play();
		cooldown=10;
		}
		
		else{
		stop=false;
		tileMap[posX-1][posY]=2;	
		tileMap[posX][posY]=0;
		tuBouges=false;
		wakawaka.pause();
		wakawaka.load();
		}
	
	
	
	
		}
		else if (direction==5){
		tuBouges=false;	
		wakawaka.pause();
		wakawaka.load();
		}
}
}
	
//Fonctions des sprites
function majSprite(){
	//Mise ? jour du sprite
currentFrame=++currentFrame%frameCount;
	//Calcul la coordonn?e X pour la spritesheet
srcx=currentFrame*singleSpriteWidth;	
	
	}

function dessinerPac() {

//Mise ? jour du sprite	
	majSprite();
//Dessine le sprite
context.save();
context.translate(collix+6,colly+5.5);
context.rotate(angle*Math.PI/180);
context.drawImage(pacman,srcx,srcy,singleSpriteWidth,singleSpriteHeight,-16,-16,pactaille,pactaille);
context.translate(-collix,-colly);
context.restore();
}
function dessinerBlinky() {
//Dessine Blinky
context.drawImage(Blinky,0,0,105,129,posYBlinky*32,posXBlinky*32,32,32);
}
function dessinerPinky() {
context.drawImage(Pinky,0,0,105,124,posYPinky*32,posXPinky*32,32,32);	
}
function dessinerInky() {
	context.drawImage(Inky,0,0,105,125,posYInky*32,posXInky*32,32,32);
}
function dessinerClyde() {
	context.drawImage(Clyde,0,0,113,128,posYClyde*32,posXClyde*32,32,32);
}

function dessinerMur(XM,YM){
context.fillStyle = 'blue';
context.beginPath();
//Premier point
context.moveTo(XM,YM+pas); //bas gauche
//Trace les c?t?s
context.lineTo(XM+pas, YM+pas); //bas droite
context.lineTo(XM+pas, YM); //haut droit
context.lineTo(XM, YM); //haut gauche
//Pour terminer la construction et la remplir
context.closePath();
context.fill();
}

function dessinerPorte(XP,YP){
context.fillStyle = 'orange';
context.beginPath();
//Premier point
context.moveTo(XP,YP+(pas)/4); //bas gauche
//Trace les c?t?s
context.lineTo(XP+pas, YP+(pas/4)); //bas droite
context.lineTo(XP+pas, YP); //haut droit
context.lineTo(XP, YP); //haut gauche
//Pour terminer la construction et la remplir
context.closePath();
context.fill();
}


function restartBlinky(){

for (i=0;i<=htile;i++)
{
    for(j=0;j<=ltile;j++)
    {
        if (restartMap[j][i]==8){
		tileMap[posXBlinky][posYBlinky]=0;
        posXBlinky=j;
        posYBlinky=i;
		tileMap[j][i]=8;
        }
    }
}

}


function restartPinky(){
for (i=0;i<=htile;i++)
{
    for(j=0;j<=ltile;j++)
    {
        if (restartMap[j][i]==9){
		tileMap[posXPinky][posYPinky]=0;
        posXPinky=j;
        posYPinky=i;
		tileMap[j][i]=9;
        }
    }
}

}


function restartInky(){
for (i=0;i<=htile;i++)
{
    for(j=0;j<=ltile;j++)
    {
        if (restartMap[j][i]==10){
		tileMap[posXInky][posYInky]=0;
        posXInky=j;
        posYInky=i;
		tileMap[j][i]=10;
        }
    }
}

}

function restartClyde(){
for (i=0;i<=htile;i++)
{
    for(j=0;j<=ltile;j++)
    {
        if (restartMap[j][i]==11){
		tileMap[posXClyde][posYClyde]=0;
        posXClyde=j;
        posYClyde=i;
		tileMap[j][i]=11;
        }
    }
}
}

function testTile(){
nombreGomme=0;
for (i=0;i<=htile;i++)
{
	for(j=0;j<=ltile;j++)
	{
		if (tileMap[j][i]==2){
		posX=j;
		posY=i;
		}

		X=32*i;
		Y=32*j;

		if (tileMap[j][i]==1)
		{
		dessinerMur(X,Y);
		}
		
		else if (tileMap[j][i]==2)
		{
		collix=32*i+10;
		colly=32*j+10;
		dessinerPac();			
		}
		
		else if (tileMap[j][i]==3)
		{
		dessinerPacGomme(X,Y);
		nombreGomme=nombreGomme+1;
		}
		else if (tileMap[j][i]==4)
		{
		dessinerGrossePacGomme(X,Y);	
		nombreGomme=nombreGomme+1;
		}
		else if (tileMap[j][i]==7){
		dessinerPorte(X,Y);	
		}
		else if (tileMap[j][i]==12){
		dessinerFruit();
		}
		else if (tileMap[j][i]==8){
			dessinerBlinky();
			posXBlinky=j;
			posYBlinky=i;
		}
		else if (tileMap[j][i]==9){
			dessinerPinky();
			posXPinky=j;
			posYPinky=i;
		}
		else if (tileMap[j][i]==10){
			dessinerInky();
			posXInky=j;
			posYInky=i;
		}
		else if (tileMap[j][i]==11){
			dessinerClyde();
			posXClyde=j;
			posYClyde=i;
		}
		

		}
	}

}

function dessinerScore(){
	context.strokeStyle="white";
	context.lineWidth='2';
	context.font='30pt comic sans ms';
	context.strokeText("Score : " + score,1000,30);
}

function compteur(){
	if (start==true)
	{
		if(Secondes<59){
		Secondes++;	
		}
		else if (Secondes==59){
			Minutes++;
			Secondes=0;
		}
	}
}

function dessinerTemps(){
	context.strokeStyle="white";
	context.lineWidth='2';
	context.font='30pt comic sans ms';
	context.strokeText("Temps : " + Minutes + "'" + Secondes ,400,30);
	
}

function vitJoueur(){
tuBouges=true	
}

function vitBlinky(){
	blinkyBouge=true;
}

function vitPinky(){
	pinkyBouge=true;
}

function vitInky(){
	inkyBouge=true;
}

function vitClyde(){
	clydeBouge=true;
}
function bonusFruit(){
if ((start==true) && (fruit==0)){
	tileMap[fruitX][fruitY]=12;
	theFruit=Math.random();
	if (theFruit<=0.02){ //Proba cl?
		fruit=1;
	}
	else if ((theFruit>0.02) && (theFruit<=0.09)){ //Proba Cloche
		fruit=2;
	}
	else if ((theFruit>0.09) && (theFruit<=0.18)){ // Proba Boss Galaga
		fruit=3;
	}
	else if ((theFruit>0.18) && (theFruit<=0.28)){ //Proba Melon
		fruit=4;
	}
	else if ((theFruit>0.28) && (theFruit<=0.40)){ //Proba Pomme
		fruit=5;
	}
	else if ((theFruit>0.40) && (theFruit<=0.55)){ //Proba Orange
		fruit=6;
	}
	else if ((theFruit>0.55) && (theFruit<=0.75)){ // Proba Fraise
		fruit=7;
	}
	else if ((theFruit>0.75) && (theFruit<=1)){ //Proba cerise
		fruit=8;
	}
}
else{
	
}
}

function dessinerFruit(){
if (fruit==0){
	
}
else if (fruit==1){
	context.drawImage(clef,fruitY*32,fruitX*32,32,32);
}
else if (fruit==2){
	context.drawImage(cloche,fruitY*32,fruitX*32,32,32);
}
else if (fruit==3){
	context.drawImage(galaga,fruitY*32,fruitX*32,32,32);
}
else if (fruit==4){
	context.drawImage(melon,fruitY*32,fruitX*32,32,32);
}
else if (fruit==5){
	context.drawImage(pomme,fruitY*32,fruitX*32,32,32);
}
else if (fruit==6){
	context.drawImage(orange,fruitY*32,fruitX*32,32,32);
}
else if (fruit==7){
	context.drawImage(fraise,fruitY*32,fruitX*32,32,32);
}
else if (fruit==8){
	context.drawImage(cerise,fruitY*32,fruitX*32,32,32);
}	
	
	
}

/*
Tableau des proba fruits

Fruits 	Points 	
Cerise 	100 	25%
Fraise 	300 	20%
Orange 	500 	15%
Pomme 	700 	12%
Melon 	1 000	10%
Galaga  2 000	9%
Cloche 	3 000	7%
Cl? 	5 000	2%
*/

function checkStartGenerator(){
	if (check==false){
		for (i=0;i<=htile;i++){
			for (j=0;j<=ltile;j++){
				if (tileMap[j][i]==12){
					fruitX=j;
					fruitY=i;
					check=true;
				}
				else{
					
				}
				
			}
			
		}
		
		
		
	}
	else{
		
	}
}

function indicNiveau(){
	context.strokeStyle="white";
	context.lineWidth='2';
	context.font='30pt comic sans ms';
	context.strokeText("Niveau " + niveau ,1000,890);
	
}



function checkFin(){
	if (nombreGomme==0){
	//red?marrage niveau
		niveau=niveau+1;
		tileMap=restartMap;
		if ((Minutes*60+Secondes)*10<=2000){ // Si le temps est inf?rieur ou ?gal ? 2000 secondes, soit 3 minutes *10 + 20 secondes*10
			score=score+2000-((Minutes*60+Secondes)*10);
			stop=true;
			start=false;
			Minutes=0;
			Secondes=0;
			apres=apres+1
			actualiser2();
		}
		else{
			
		}
	}
	
	
}

var avant=0;
var apres=0;

function checkFin2(){
	if (dead==true){
	//red?marrage niveau
		
		
		if (superPac==true){
		dead=false;
}

else if (superPac==false){
	
	


for (i=0;i<=htile;i++)
{
	for(j=0;j<=ltile;j++)
	{
		if (tileMap[j][i]==2){
		tileMap[j][i]=0;
		}
		if (tileMap[j][i]==8){
		tileMap[j][i]=0;
		}
		if (tileMap[j][i]==9){
		tileMap[j][i]=0;
		}
		if (tileMap[j][i]==10){
		tileMap[j][i]=0;
		}
		if (tileMap[j][i]==11){
		tileMap[j][i]=0;
		}
		
		if (restartMap[j][i]==2){
		tileMap[j][i]=2;
		posX=j;
		posY=i;
		}
		if (restartMap[j][i]==8){
		tileMap[j][i]=8;
		posXBlinky=j;
		posYBlinky=i;
		}
		if (restartMap[j][i]==9){
		tileMap[j][i]=9;
		posXPinky=j;
		posYPinky=i;
		}
		if (restartMap[j][i]==10){
		tileMap[j][i]=10;
		posXInky=j;
		posYInky=i;
		}
		if (restartMap[j][i]==11){
		tileMap[j][i]=11;
		posXClyde=j;
		posYClyde=i;
		}
		
		
	}
}	
		vies=vies-1;
		stop=true;
		start=false;
		direction=5;
		dead=false;
		
		
		
	
}
	
	}
}
	
	


function dessinerVies(){
	if (scorevies>=10000){
	vies=vies+1;	
	scorevies=scorevies-10000;
	}
	else{
		
	}
	context.strokeStyle="white";
	context.lineWidth='2';
	context.font='30pt comic sans ms';
	context.strokeText("Vies : " + vies ,400,890);	
}


function dessinerStart(){
	if(start==false){
	context.strokeStyle="white";
	context.lineWidth='2';
	context.font='30pt comic sans ms';
	context.strokeText("Ready?",largeur_fenetre/2-60,hauteur_fenetre/2);	
	}
	else{
		
	}
}

//BLINKY
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


function dirBlinky (){
	var startBlinky = Math.floor(Math.random()*4);
	if ((startBlinky==3) && (tileMap[j-1][i]!=1))//up
	{
		directionBlinky=3;
	}
	
	else if (startBlinky==1)//bottom
	{
		 directionBlinky=1;
		
	}
	
	else if (startBlinky==2)//right
	{
		directionBlinky=2;
		
	}
	
	else if (startBlinky==0)//left
	{
		directionBlinky=0;
		
	}
}

function refreshchoice(){
	choicetest=Math.floor(Math.random()*3)+1;
}



function deplaceBlinky() {
	refreshchoice();
	if (blinkyBouge==true && start==true){
	if (directionBlinky==0){
		if (tileMap[posXBlinky][posYBlinky-1]==1)
		{

			if (choicetest==1) {
				
				directionBlinky=3;
			}
			
			else if (choicetest==2)
			{
	directionBlinky= 1;
				
			}
		}
		
		else if (tileMap[posXBlinky][posYBlinky-1]==3)
		{
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=3;
		blinkyBouge=false;
		
		}
		
		else if (tileMap[posXBlinky][posYBlinky-1]==5){
		tileMap[posXBlinky][ltile-3]=8;	
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		}
		
		else if (tileMap[posXBlinky][posYBlinky-1]==9){
			
			if (choicetest==1) {
				
				directionBlinky=3;
			}
			
			else if (choicetest==2)
			{
	directionBlinky= 1;
				
			}
			
			
		}
		
		
		else if (tileMap[posXBlinky][posYBlinky-1]==10){
			
			if (choicetest==1) {
				
				directionBlinky=3;
			}
			
			else if (choicetest==2)
			{
	directionBlinky= 1;
				
			}
			
			
		}
		
		else if (tileMap[posXBlinky][posYBlinky-1]==11){
			
			if (choicetest==1) {
				
				directionBlinky=3;
			}
			
			else if (choicetest==2)
			{
	directionBlinky= 1;
				
			}
			
			
		}
		
		else if (tileMap[posXBlinky][posYBlinky-1]==2){
			
			dead=true;
			
			directionBlinky=2;
			
		}
		
		else if (tileMap[posXBlinky][posYBlinky-1]==12){
			if (fruit==0){
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=12;
		blinkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			else if (fruit==3){
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;				
				
			}			
			else if (fruit==5){
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;				
			}			
			else if (fruit==6){
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;				
			}			
			else if (fruit==7){
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;				
			}
			else if (fruit==8){
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;				
				
			}
			
			
		}
		
		else if (tileMap[posXBlinky][posYBlinky-1]==4)
		{

		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=4;
		blinkyBouge=false;
		}
		
		
		else
		{
		tileMap[posXBlinky][posYBlinky-1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		}
		
	}
	
	
	///////////////////////////////////////////////
	else if (directionBlinky==1){
		if (tileMap[posXBlinky+1][posYBlinky]==1)
		{
			
			if (choicetest==1) {
				
				directionBlinky=2;
			}
			
			else if (choicetest==2)
			{
				
			directionBlinky= 0;
				
			}
		}
		
		else if (tileMap[posXBlinky+1][posYBlinky]==3)
		{
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=3;
		blinkyBouge=false;
		}
		
		else if (tileMap[posXBlinky+1][posYBlinky]==9){
			
			if (choicetest==1) {
				
				directionBlinky=2;
			}
			
			else if (choicetest==2)
			{
				
			directionBlinky= 0;
				
			}
			
		}
		
		else if (tileMap[posXBlinky+1][posYBlinky]==10){
			
			if (choicetest==1) {
				
				directionBlinky=2;
			}
			
			else if (choicetest==2)
			{
				
			directionBlinky= 0;
				
			}
			
		}
		
		else if (tileMap[posXBlinky+1][posYBlinky]==11){
			
			if (choicetest==1) {
				
				directionBlinky=2;
			}
			
			else if (choicetest==2)
			{
				
			directionBlinky= 0;
				
			}
			
		}
		
		else if (tileMap[posXBlinky+1][posYBlinky]==2){
			
			dead=true;
			
			directionBlinky=3;
			
		}
		
		
		else if (tileMap[posXBlinky+1][posYBlinky]==12){
			if (fruit==0){
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=12;
		blinkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}		
			else if (fruit==6){
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			else if (fruit==8){
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			
			
		}
		
		else if (tileMap[posXBlinky+1][posYBlinky]==4)
		{
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=4;
		blinkyBouge=false;
		}
		
		else{	
		stop=false;
		tileMap[posXBlinky+1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		}
		
		}
		
		
		
		///////////////////////////////////////////////
	else if (directionBlinky==2){
		
		if (tileMap[posXBlinky][posYBlinky+1]==1){
			
			if (choicetest==1) {
				directionBlinky=3;
			}
			
			else if (choicetest==2)
			{
				
			directionBlinky= 1;
				
			}
		}
		else if (tileMap[posXBlinky][posYBlinky+1]==3){
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=3;
		blinkyBouge=false;
		}
		
		
		else if (tileMap[posXBlinky][posYBlinky+1]==6){
		tileMap[posXBlinky][1]=8;	
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		}
		
		else if (tileMap[posXBlinky][posYBlinky+1]==9){
			
			if (choicetest==1) {
				directionBlinky=3;
			}
			
			else if (choicetest==2)
			{
				
			directionBlinky= 1;
				
			}
			
		}
		
		else if (tileMap[posXBlinky][posYBlinky+1]==10){
			
			if (choicetest==1) {
				directionBlinky=3;
			}
			
			else if (choicetest==2)
			{
				
			directionBlinky= 1;
				
			}
			
		}
		
		else if (tileMap[posXBlinky][posYBlinky+1]==11){
			
			if (choicetest==1) {
				directionBlinky=3;
			}
			
			else if (choicetest==2)
			{
				
			directionBlinky= 1;
				
			}
			
		}
		
		else if (tileMap[posXBlinky][posYBlinky+1]==2){
			
			dead=true;
			
			directionBlinky=0;
		}
		
		
		else if (tileMap[posXBlinky][posYBlinky+1]==12){
			if (fruit==0){
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=12;
		blinkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==6){
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			else if (fruit==8){
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			
			
		}
		
		else if (tileMap[posXBlinky][posYBlinky+1]==4)
		{
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=4;
		blinkyBouge=false;
		}

		else{	
		stop=false;
		tileMap[posXBlinky][posYBlinky+1]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		}
		
		}
		
		
		
	///////////////////////////////////////////////	
	else if (directionBlinky==3){
		if (tileMap[posXBlinky-1][posYBlinky]==1){
			
			if (choicetest==1) {
				
				directionBlinky=2;
			}
			
			else if (choicetest==2)
			{
			directionBlinky= 0;
			}
		}
		else if (tileMap[posXBlinky-1][posYBlinky]==3){
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=3;
		blinkyBouge=false;
		}
		
		else if (tileMap[posXBlinky-1][posYBlinky]==9){
			
			if (choicetest==1) {
				
				directionBlinky=2;
			}
			
			else if (choicetest==2)
			{
			directionBlinky= 0;
			}
		}
			
			
		else if (tileMap[posXBlinky-1][posYBlinky]==10){
			
			if (choicetest==1) {
				
				directionBlinky=2;
			}
			
			else if (choicetest==2)
			{
			directionBlinky= 0;
			}
		}	
		
		else if (tileMap[posXBlinky-1][posYBlinky]==11){
			
			if (choicetest==1) {
				
				directionBlinky=2;
			}
			
			else if (choicetest==2)
			{
			directionBlinky= 0;
			}
		}
		
		else if (tileMap[posXBlinky-1][posYBlinky]==2){
			
		dead=true;	
		
		directionBlinky=1;
		}
		
		
		else if (tileMap[posXBlinky-1][posYBlinky]==12){
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=12;
		blinkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==6){
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			else if (fruit==8){
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		fruit=0;
			}
			
			

		else if (tileMap[posXBlinky][posYBlinky]==4)
		{
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=4;
		blinkyBouge=false;
		}
		
		else{	
		tileMap[posXBlinky-1][posYBlinky]=8;
		tileMap[posXBlinky][posYBlinky]=0;
		blinkyBouge=false;
		}
	
	
	
	
		
	}
	}
	
}
		
	
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//Pinky

function dirPinky (){
	var startPinky = Math.floor(Math.random()*4);
	if ((startPinky==3) && (tileMap[j-1][i]!=1))//up
	{
		directionPinky=3;
	}
	
	else if (startPinky==1)//bottom
	{
		 directionPinky=1;
		
	}
	
	else if (startPinky==2)//right
	{
		directionPinky=2;
		
	}
	
	else if (startPinky==0)//left
	{
		directionPinky=0;
		
	}
}

function refreshchoice2(){
	choicetest2=Math.floor(Math.random()*3)+1;
}



function deplacePinky() {
	refreshchoice2();
	if (pinkyBouge==true && start==true){
	if (directionPinky==0){
		if (tileMap[posXPinky][posYPinky-1]==1)
		{

			if (choicetest2==1) {
				
				directionPinky=3;
			}
			
			else if (choicetest2==2)
			{
	directionPinky= 1;
				
			}
		}
		
		else if (tileMap[posXPinky][posYPinky-1]==3)
		{
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=3;
		pinkyBouge=false;
		
		}
		
		else if (tileMap[posXPinky][posYPinky-1]==8){
			
			if (choicetest2==1) {
				
				directionPinky=3;
			}
			
			else if (choicetest2==2)
			{
	directionPinky= 1;
				
			}
			
		}
		
		else if (tileMap[posXPinky][posYPinky-1]==10){
			
			if (choicetest2==1) {
				
				directionPinky=3;
			}
			
			else if (choicetest2==2)
			{
	directionPinky= 1;
				
			}
			
		}
		
		else if (tileMap[posXPinky][posYPinky-1]==11){
			
			if (choicetest2==1) {
				
				directionPinky=3;
			}
			
			else if (choicetest2==2)
			{
	directionPinky= 1;
				
			}
			
		}
		
		else if (tileMap[posXPinky][posYPinky-1]==2){
			
		dead=true;
		
		directionPinky=2;
		
		}
		
		
		
		else if (tileMap[posXPinky][posYPinky-1]==5){
		tileMap[posXPinky][ltile-3]=9;	
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		}
		
		else if (tileMap[posXPinky][posYPinky-1]==12){
			if (fruit==0){
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=12;
		pinkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			else if (fruit==3){
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;				
				
			}			
			else if (fruit==5){
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;				
			}			
			else if (fruit==6){
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;				
			}			
			else if (fruit==7){
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=0;
		plinkyBouge=false;
		fruit=0;				
			}
			else if (fruit==9){
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;				
				
			}
			
			
		}
		
		else if (tileMap[posXPinky][posYPinky-1]==4)
		{

		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=4;
		pinkyBouge=false;
		}
		
		else
		{
		tileMap[posXPinky][posYPinky-1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		}
		
	}
	
	
	///////////////////////////////////////////////
	else if (directionPinky==1){
		if (tileMap[posXPinky+1][posYPinky]==1)
		{
			
			if (choicetest2==1) {
				
				directionPinky=2;
			}
			
			else if (choicetest2==2)
			{
				
			directionPinky= 0;
				
			}
			pinkyBouge=false;
		}
		
		else if (tileMap[posXPinky+1][posYPinky]==3)
		{
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=3;
		pinkyBouge=false;
		}
		
		else if (tileMap[posXPinky+1][posYPinky]==8)
		{
			
			if (choicetest2==1) {
				
				directionPinky=2;
			}
			
			else if (choicetest2==2)
			{
				
			directionPinky= 0;
				
			}
			
		}
		
		
		else if (tileMap[posXPinky+1][posYPinky]==10)
		{
			
			if (choicetest2==1) {
				
				directionPinky=2;
			}
			
			else if (choicetest2==2)
			{
				
			directionPinky= 0;
				
			}
			
		}
		
		else if (tileMap[posXPinky+1][posYPinky]==11)
		{
			
			if (choicetest2==1) {
				
				directionPinky=2;
			}
			
			else if (choicetest2==2)
			{
				
			directionPinky= 0;
				
			}
			
		}
		
		else if (tileMap[posXPinky+1][posYPinky]==2)
		{
			
			dead=true;
			
			directionPinky=3;
			
		}
		
		else if (tileMap[posXPinky+1][posYPinky]==12){
			if (fruit==0){
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=12;
		pinkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}		
			else if (fruit==6){
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			else if (fruit==9){
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			
			
		}
		
		else if (tileMap[posXPinky+1][posYPinky]==4)
		{
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=4;
		pinkyBouge=false;
		}
		
		else{	
		tileMap[posXPinky+1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		}
		
		}
		
		
		
		///////////////////////////////////////////////
	else if (directionPinky==2){
		
		if (tileMap[posXPinky][posYPinky+1]==1){
			
			if (choicetest2==1) {
				directionPinky=3;
			}
			
			else if (choicetest2==2)
			{
				
			directionPinky= 1;
				
			}
			pinkyBouge=false;
		}
		else if (tileMap[posXPinky][posYPinky+1]==3){
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=3;
		pinkyBouge=false;
		}
		
		else if (tileMap[posXPinky][posYPinky+1]==8){
			
			if (choicetest2==1) {
				directionPinky=3;
			}
			
			else if (choicetest2==2)
			{
				
			directionPinky= 1;
				
			}
			
		}
		
		else if (tileMap[posXPinky][posYPinky+1]==10){
			
			if (choicetest2==1) {
				directionPinky=3;
			}
			
			else if (choicetest2==2)
			{
				
			directionPinky= 1;
				
			}
			
		}
		
		else if (tileMap[posXPinky][posYPinky+1]==11){
			
			if (choicetest2==1) {
				directionPinky=3;
			}
			
			else if (choicetest2==2)
			{
				
			directionPinky= 1;
				
			}
			
		}
		
		else if (tileMap[posXPinky][posYPinky+1]==2){
			
		dead=true;
		
		directionPinky=0;
		
		}
		
		else if (tileMap[posXPinky][posYPinky+1]==6){
		tileMap[posXPinky][1]=9;	
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		}
		
		else if (tileMap[posXPinky][posYPinky+1]==12){
			if (fruit==0){
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=12;
		pinkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==6){
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			else if (fruit==9){
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			
			
		}
		
		else if (tileMap[posXPinky][posYPinky+1]==4)
		{
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=4;
		pinkyBouge=false;
		}

		else{	
		stop=false;
		tileMap[posXPinky][posYPinky+1]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		}
		
		}
		
		
		
	///////////////////////////////////////////////	
	else if (directionPinky==3){
		if (tileMap[posXPinky-1][posYPinky]==1){
			
			if (choicetest2==1) {
				
				directionPinky=2;
			}
			
			else if (choicetest2==2)
			{
			directionPinky= 0;
			}
		}
		else if (tileMap[posXPinky-1][posYPinky]==3){
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=3;
		pinkyBouge=false;
		}
		
		else if (tileMap[posXPinky-1][posYPinky]==8){
			
			if (choicetest2==1) {
				
				directionPinky=2;
			}
			
			else if (choicetest2==2)
			{
			directionPinky= 0;
			}
			
		}
		
		else if (tileMap[posXPinky-1][posYPinky]==10){
			
			if (choicetest2==1) {
				
				directionPinky=2;
			}
			
			else if (choicetest2==2)
			{
			directionPinky= 0;
			}
			
		}
		
		else if (tileMap[posXPinky-1][posYPinky]==11){
			
			if (choicetest2==1) {
				
				directionPinky=2;
			}
			
			else if (choicetest2==2)
			{
			directionPinky= 0;
			}
			
		}
		
		else if (tileMap[posXPinky-1][posYPinky]==2){
			
		dead=true;

		directionPinky=1;
		
		}
		
		
		else if (tileMap[posXPinky-1][posYPinky]==12){
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=12;
		pinkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==6){
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			else if (fruit==9){
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		fruit=0;
			}
			
			

		else if (tileMap[posXPinky-1][posYPinky]==4)
		{
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=4;
		pinkyBouge=false;
		}
		
		else{	
		tileMap[posXPinky-1][posYPinky]=9;
		tileMap[posXPinky][posYPinky]=0;
		pinkyBouge=false;
		}
	
	
	
	
		
	}
	}
	
}

///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//Inky
	
function dirInky (){
	var startInky = Math.floor(Math.random()*4);
	if ((startInky==3) && (tileMap[j-1][i]!=1))//up
	{
		directionInky=3;
	}
	
	else if (startInky==1)//bottom
	{
		 directionInky=1;
		
	}
	
	else if (startInky==2)//right
	{
		directionInky=2;
		
	}
	
	else if (startInky==0)//left
	{
		directionInky=0;
		
	}
}

function refreshchoice3(){
	choicetest3=Math.floor(Math.random()*3)+1;
}	
	
	
	
	function deplaceInky() {
	refreshchoice3();
	if (inkyBouge==true && start==true){
	if (directionInky==0){
		if (tileMap[posXInky][posYInky-1]==1)
		{

			if (choicetest3==1) {
				
				directionInky=3;
			}
			
			else if (choicetest3==2)
			{
	directionInky= 1;
				
			}
		}
		
		else if (tileMap[posXInky][posYInky-1]==3)
		{
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=3;
		inkyBouge=false;
		
		}
		
		else if (tileMap[posXInky][posYInky-1]==8)
		{
			
		if (choicetest3==1) {
				
				directionInky=3;
			}
			
			else if (choicetest3==2)
			{
	directionInky= 1;
				
			}	
			
		}
		
		else if (tileMap[posXInky][posYInky-1]==9)
		{
			
		if (choicetest3==1) {
				
				directionInky=3;
			}
			
			else if (choicetest3==2)
			{
	directionInky= 1;
				
			}	
			
		}
		
		else if (tileMap[posXInky][posYInky-1]==11)
		{
			
		if (choicetest3==1) {
				
				directionInky=3;
			}
			
			else if (choicetest3==2)
			{
	directionInky= 1;
				
			}	
			
		}
		
		else if (tileMap[posXInky][posYInky-1]==2)
		{
			
		dead=true;
		
		directionInky=2;
		
		}
		
		else if (tileMap[posXInky][posYInky-1]==5){
		tileMap[posXInky][ltile-3]=10;	
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		}
		
		else if (tileMap[posXInky][posYInky-1]==12){
			if (fruit==0){
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=12;
		inkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			else if (fruit==3){
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;				
				
			}			
			else if (fruit==5){
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;				
			}			
			else if (fruit==6){
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;				
			}			
			else if (fruit==7){
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=0;
		plinkyBouge=false;
		fruit=0;				
			}
			else if (fruit==10){
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;				
				
			}
			
			
		}
		
		else if (tileMap[posXInky][posYInky-1]==4)
		{

		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=4;
		inkyBouge=false;
		}
		
		else
		{
		tileMap[posXInky][posYInky-1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		}
		
	}
	
	
	///////////////////////////////////////////////
	else if (directionInky==1){
		if (tileMap[posXInky+1][posYInky]==1)
		{
			
			if (choicetest3==1) {
				
				directionInky=2;
			}
			
			else if (choicetest3==2)
			{
				
			directionInky= 0;
				
			}
			inkyBouge=false;
		}
		
		else if (tileMap[posXInky+1][posYInky]==3)
		{
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=3;
		inkyBouge=false;
		}
		
		else if (tileMap[posXInky+1][posYInky]==8)
		{
			
			if (choicetest3==1) {
				
				directionInky=2;
			}
			
			else if (choicetest3==2)
			{
				
			directionInky= 0;
				
			}
			
		}
		
		else if (tileMap[posXInky+1][posYInky]==9)
		{
			
			if (choicetest3==1) {
				
				directionInky=2;
			}
			
			else if (choicetest3==2)
			{
				
			directionInky= 0;
				
			}
			
		}
		
		else if (tileMap[posXInky+1][posYInky]==11)
		{
			
			if (choicetest3==1) {
				
				directionInky=2;
			}
			
			else if (choicetest3==2)
			{
				
			directionInky= 0;
				
			}
			
		}
		
		else if (tileMap[posXInky+1][posYInky]==2)
		{
			
			dead=true;
			
			directionInky=3;
			
		}
		
		else if (tileMap[posXInky+1][posYInky]==12){
			if (fruit==0){
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=12;
		inkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}		
			else if (fruit==6){
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			else if (fruit==10){
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			
			
		}
		
		else if (tileMap[posXInky+1][posYInky]==4)
		{
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=4;
		inkyBouge=false;
		}
		
		else{	
		tileMap[posXInky+1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		}
		
		}
		
		
		
		///////////////////////////////////////////////
	else if (directionInky==2){
		
		if (tileMap[posXInky][posYInky+1]==1){
			
			if (choicetest3==1) {
				directionInky=3;
			}
			
			else if (choicetest3==2)
			{
				
			directionInky= 1;
				
			}
			inkyBouge=false;
		}
		else if (tileMap[posXInky][posYInky+1]==3){
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=3;
		inkyBouge=false;
		}
		
		else if (tileMap[posXInky][posYInky+1]==8){
		
		if (choicetest3==1) {
				directionInky=3;
			}
			
			else if (choicetest3==2)
			{
				
			directionInky= 1;
				
			}
		
		}
		
		else if (tileMap[posXInky][posYInky+1]==9){
		
		if (choicetest3==1) {
				directionInky=3;
			}
			
			else if (choicetest3==2)
			{
				
			directionInky= 1;
				
			}
		
		}
		
		else if (tileMap[posXInky][posYInky+1]==11){
		
		if (choicetest3==1) {
				directionInky=3;
			}
			
			else if (choicetest3==2)
			{
				
			directionInky= 1;
				
			}
		
		}
		
		else if (tileMap[posXInky][posYInky+1]==2){
			
			dead=true;
			
			directionInky=0;
			
		}
		
		else if (tileMap[posXInky][posYInky+1]==6){
		tileMap[posXInky][1]=10;	
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		}
		
		else if (tileMap[posXInky][posYInky+1]==12){
			if (fruit==0){
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=12;
		inkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==6){
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			else if (fruit==10){
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			
			
		}
		
		else if (tileMap[posXInky][posYInky+1]==4)
		{
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=4;
		inkyBouge=false;
		}

		else{	
		stop=false;
		tileMap[posXInky][posYInky+1]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		}
		
		}
		
		
		
	///////////////////////////////////////////////	
	else if (directionInky==3){
		if (tileMap[posXInky-1][posYInky]==1){
			
			if (choicetest3==1) {
				
				directionInky=2;
			}
			
			else if (choicetest3==2)
			{
			directionInky= 0;
			}
		}
		else if (tileMap[posXInky-1][posYInky]==3){
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=3;
		inkyBouge=false;
		}
		
		else if (tileMap[posXInky-1][posYInky]==8){
			
			if (choicetest3==1) {
				
				directionInky=2;
			}
			
			else if (choicetest3==2)
			{
			directionInky= 0;
			}
			
		}
		
		else if (tileMap[posXInky-1][posYInky]==9){
			
			if (choicetest3==1) {
				
				directionInky=2;
			}
			
			else if (choicetest3==2)
			{
			directionInky= 0;
			}
			
		}
		
		else if (tileMap[posXInky-1][posYInky]==11){
			
			if (choicetest3==1) {
				
				directionInky=2;
			}
			
			else if (choicetest3==2)
			{
			directionInky= 0;
			}
			
		}
		
		else if (tileMap[posXInky-1][posYInky]==2){
			
			dead=true;
			
			directionInky=1;
			
		}
		
		else if (tileMap[posXInky-1][posYInky]==12){
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=12;
		inkyBouge=false;
			}
			else if (fruit==1){
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==6){
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			else if (fruit==10){
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		fruit=0;
			}
			
			

		else if (tileMap[posXInky-1][posYInky]==4)
		{
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=4;
		inkyBouge=false;
		}
		
		else{	
		tileMap[posXInky-1][posYInky]=10;
		tileMap[posXInky][posYInky]=0;
		inkyBouge=false;
		}
	
	
	
	
		
	}
	}
	
}

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///CLYDE

function dirClyde (){
	var startClyde = Math.floor(Math.random()*4);
	if ((startClyde==3) && (tileMap[j-1][i]!=1))//up
	{
		directionClyde=3;
	}
	
	else if (startClyde==1)//bottom
	{
		 directionClyde=1;
		
	}
	
	else if (startClyde==2)//right
	{
		directionClyde=2;
		
	}
	
	else if (startClyde==0)//left
	{
		directionClyde=0;
		
	}
}

function refreshchoice4(){
	choicetest4=Math.floor(Math.random()*3)+1;
}




function deplaceClyde() {
	refreshchoice4();
	if (clydeBouge==true && start==true){
	if (directionClyde==0){
		if (tileMap[posXClyde][posYClyde-1]==1)
		{

			if (choicetest4==1) {
				
				directionClyde=3;
			}
			
			else if (choicetest4==2)
			{
	directionClyde= 1;
				
			}
		}
		
		else if (tileMap[posXClyde][posYClyde-1]==3)
		{
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=3;
		clydeBouge=false;
		
		}
		
		else if (tileMap[posXClyde][posYClyde-1]==8)
		{
		
		if (choicetest4==1) {
				
				directionClyde=3;
			}
			
			else if (choicetest4==2)
			{
	directionClyde= 1;
				
			}
		
		}
		
		else if (tileMap[posXClyde][posYClyde-1]==9)
		{
		
		if (choicetest4==1) {
				
				directionClyde=3;
			}
			
			else if (choicetest4==2)
			{
	directionClyde= 1;
				
			}
		
		}
		
		else if (tileMap[posXClyde][posYClyde-1]==10)
		{
		
		if (choicetest4==1) {
				
				directionClyde=3;
			}
			
			else if (choicetest4==2)
			{
	directionClyde= 1;
				
			}
		
		}
		
		else if (tileMap[posXClyde][posYClyde-1]==2)
		{
			
			dead=true;
			
			directionClyde=2;
			
		}
		
		else if (tileMap[posXClyde][posYClyde-1]==5){
		tileMap[posXClyde][ltile-3]=11;	
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		}
		
		else if (tileMap[posXClyde][posYClyde-1]==12){
			if (fruit==0){
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=12;
		clydeBouge=false;
			}
			else if (fruit==1){
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			else if (fruit==3){
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;				
				
			}			
			else if (fruit==5){
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;				
			}			
			else if (fruit==6){
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;				
			}			
			else if (fruit==7){
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=0;
		plclydeBouge=false;
		fruit=0;				
			}
			else if (fruit==11){
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;				
				
			}
			
			
		}
		
		else if (tileMap[posXClyde][posYClyde-1]==4)
		{

		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=4;
		clydeBouge=false;
		}
		
		else
		{
		tileMap[posXClyde][posYClyde-1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		}
		
	}
	
	
	///////////////////////////////////////////////
	else if (directionClyde==1){
		if (tileMap[posXClyde+1][posYClyde]==1)
		{
			
			if (choicetest4==1) {
				
				directionClyde=2;
			}
			
			else if (choicetest4==2)
			{
				
			directionClyde= 0;
				
			}
			clydeBouge=false;
		}
		
		else if (tileMap[posXClyde+1][posYClyde]==3)
		{
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=3;
		clydeBouge=false;
		}
		
		else if (tileMap[posXClyde+1][posYClyde]==8)
		{
			
			if (choicetest4==1) {
				
				directionClyde=2;
			}
			
			else if (choicetest4==2)
			{
				
			directionClyde= 0;
				
			}
		
		}
		
		else if (tileMap[posXClyde+1][posYClyde]==9)
		{
			
			if (choicetest4==1) {
				
				directionClyde=2;
			}
			
			else if (choicetest4==2)
			{
				
			directionClyde= 0;
				
			}
		
		}
		
		else if (tileMap[posXClyde+1][posYClyde]==10)
		{
			
			if (choicetest4==1) {
				
				directionClyde=2;
			}
			
			else if (choicetest4==2)
			{
				
			directionClyde= 0;
				
			}
		
		}
		
		else if (tileMap[posXClyde+1][posYClyde]==2)
		{
			
		dead=true;

			directionClyde=3;
			
		}
		
		
		else if (tileMap[posXClyde+1][posYClyde]==12){
			if (fruit==0){
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=12;
		clydeBouge=false;
			}
			else if (fruit==1){
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}		
			else if (fruit==6){
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			else if (fruit==11){
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			
			
		}
		
		else if (tileMap[posXClyde+1][posYClyde]==4)
		{
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=4;
		clydeBouge=false;
		}
		
		else{	
		tileMap[posXClyde+1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		}
		
		}
		
		
		
		///////////////////////////////////////////////
	else if (directionClyde==2){
		
		if (tileMap[posXClyde][posYClyde+1]==1){
			
			if (choicetest4==1) {
				directionClyde=3;
			}
			
			else if (choicetest4==2)
			{
				
			directionClyde= 1;
				
			}
			clydeBouge=false;
		}
		else if (tileMap[posXClyde][posYClyde+1]==3){
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=3;
		clydeBouge=false;
		}
		
		else if (tileMap[posXClyde][posYClyde+1]==8){
			
			if (choicetest4==1) {
				directionClyde=3;
			}
			
			else if (choicetest4==2)
			{
				
			directionClyde= 1;
				
			}
			
		}
		
		else if (tileMap[posXClyde][posYClyde+1]==9){
			
			if (choicetest4==1) {
				directionClyde=3;
			}
			
			else if (choicetest4==2)
			{
				
			directionClyde= 1;
				
			}
			
		}
		
		else if (tileMap[posXClyde][posYClyde+1]==10){
			
			if (choicetest4==1) {
				directionClyde=3;
			}
			
			else if (choicetest4==2)
			{
				
			directionClyde= 1;
				
			}
			
		}
		
		else if (tileMap[posXClyde][posYClyde+1]==2){
			
			dead=true;
			
			directionClyde=0;
			
		}
		
		else if (tileMap[posXClyde][posYClyde+1]==6){
		tileMap[posXClyde][1]=11;	
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		}
		
		else if (tileMap[posXClyde][posYClyde+1]==12){
			if (fruit==0){
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=12;
		clydeBouge=false;
			}
			else if (fruit==1){
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==6){
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			else if (fruit==11){
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			
			
		}
		
		else if (tileMap[posXClyde][posYClyde+1]==4)
		{
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=4;
		clydeBouge=false;
		}

		else{	
		stop=false;
		tileMap[posXClyde][posYClyde+1]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		}
		
		}
		
		
		
	///////////////////////////////////////////////	
	else if (directionClyde==3){
		if (tileMap[posXClyde-1][posYClyde]==1){
			
			if (choicetest4==1) {
				
				directionClyde=2;
			}
			
			else if (choicetest4==2)
			{
			directionClyde= 0;
			}
		}
		else if (tileMap[posXClyde-1][posYClyde]==3){
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=3;
		clydeBouge=false;
		}
		
		else if (tileMap[posXClyde-1][posYClyde]==8){
			
			if (choicetest4==1) {
				
				directionClyde=2;
			}
			
			else if (choicetest4==2)
			{
			directionClyde= 0;
			}
		
		}
		
		else if (tileMap[posXClyde-1][posYClyde]==9){
			
			if (choicetest4==1) {
				
				directionClyde=2;
			}
			
			else if (choicetest4==2)
			{
			directionClyde= 0;
			}
		
		}
		
		else if (tileMap[posXClyde-1][posYClyde]==10){
			
			if (choicetest4==1) {
				
				directionClyde=2;
			}
			
			else if (choicetest4==2)
			{
			directionClyde= 0;
			}
		
		}
		
		else if (tileMap[posXClyde-1][posYClyde]==2){
			
			dead=true;
			
			directionClyde=1;
			
		}
		
		
		else if (tileMap[posXClyde-1][posYClyde]==12){
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=12;
		clydeBouge=false;
			}
			else if (fruit==1){
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			else if (fruit==2){
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==3){
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==4){
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==5){
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==6){
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}			
			else if (fruit==7){
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			else if (fruit==11){
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		fruit=0;
			}
			
			

		else if (tileMap[posXClyde-1][posYClyde]==4)
		{
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=4;
		clydeBouge=false;
		}
		
		else{	
		tileMap[posXClyde-1][posYClyde]=11;
		tileMap[posXClyde][posYClyde]=0;
		clydeBouge=false;
		}
	
	
	
	
		
	}
	}
	
}

function actualiser(){
	
	if (vies<0){
		
		location.reload()
		
	}
	
}

function actualiser2(){
	
	location.reload()
	
}

var dead=false;
	
	function decompte(){
	if (cooldown>0){
	cooldown=cooldown-1;
	}
	else{
	cooldown=0;
	superPac=false;
}
}

function superPacman(){
	if (superPac==true){
		context.strokeStyle="white";
		context.lineWidth='2';
		context.font='30pt comic sans ms';
		context.strokeText("Super Pacman!",largeur_fenetre/2-140,hauteur_fenetre/2);
	}
	
	else{

	}
}

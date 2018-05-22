//� chaque reload
window.addEventListener('load', function () {
// On r�cup�re l'objet canvas
var elem = document.getElementById('canvasElem');
if (!elem || !elem.getContext) {
	return;
	}
	// On r�cup�re le contexte 2D
	context = elem.getContext('2d');
    if (!context) {
		return;
		} 
	// Boucle de rafraichissement du contexte 2D
	boucleJeu = setInterval(refreshGame, intervalTemps); //refresh tous les x ms
	}, false);
	
	//variables internes
var boucleJeu; //appel�e pour refresh
var intervalTemps =50; //temps entre 2 refresh en ms
var context; //le contexte 2d
 
// Constantes du jeu
var largeur_fenetre = 608; //taille du canvas
var hauteur_fenetre = 672; //hauteur du canvas
var pas=31;

//taille de Pacman
var pactaille=32;
//Coordonn�es de pacman
var xplay=0;
var yplay=0;

//Coordonn�es Centre de collision
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

	//Coordonn�es pour le rendu du sprite
	var x=0;
	var y=0;

	//Coordonn�es pour la spritesheet
	var srcx=0;
	var srcy=0;

	//On cr�e une variable dans laquelle la spritesheet sera stock�e
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
	clef.src='cl�.png';
	
	var fruit=0;
	
	var angle=0;
	
//Tilemap (conception du niveau)
var ltile=20;
var htile=21;
var tileMap = new Array;
tileMap=[
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,4,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,4,1],
[1,3,1,1,3,1,1,1,3,1,3,1,1,1,3,1,1,3,1],
[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
[1,3,1,1,3,1,3,1,1,1,1,1,3,1,3,1,1,3,1],
[1,3,3,3,3,1,3,3,3,1,3,3,3,1,3,3,3,3,1],
[1,1,1,1,3,1,1,1,3,1,3,1,1,1,3,1,1,1,1],
[0,0,0,1,3,1,0,0,0,0,0,0,0,1,3,1,0,0,0],
[1,1,1,1,3,1,0,1,7,7,7,1,0,1,3,1,1,1,1],
[5,3,3,3,3,3,0,1,0,0,0,1,0,3,3,3,3,3,6],
[1,1,1,1,3,1,0,1,1,1,1,1,0,1,3,1,1,1,1],
[0,0,0,1,3,1,0,0,0,12,0,0,0,1,3,1,0,0,0],
[1,1,1,1,3,1,3,1,1,1,1,1,3,1,3,1,1,1,1],
[1,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,1],
[1,3,1,1,3,1,1,1,3,1,3,1,1,1,3,1,1,3,1],
[1,3,3,1,3,3,3,3,3,2,3,3,3,3,3,1,3,3,1],
[1,1,3,1,3,1,3,1,1,1,1,1,3,1,3,1,3,1,1],
[1,3,3,3,3,1,3,3,3,1,3,3,3,1,3,3,3,3,1],
[1,3,1,1,1,1,1,1,3,1,3,1,1,1,1,1,1,3,1],
[1,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];
//0=vide	;	1=Mur	;	2=Joueur	;	3=Pac-Gomme		;	4=Super Pac-Gomme	;	5=t�l�portation gauche	;	6=t�l�portation droite	;	7=Porte fant�mes
//8=Blinky	;	9=Pinky	;	10=Inky		;	11=Clyde		;	12=G�n�rateur de bonus al�atoire
var posX=0;
var posY=0;

var restartMap = new Array;
restartMap=[
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,4,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,4,1],
[1,3,1,1,3,1,1,1,3,1,3,1,1,1,3,1,1,3,1],
[1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
[1,3,1,1,3,1,3,1,1,1,1,1,3,1,3,1,1,3,1],
[1,3,3,3,3,1,3,3,3,1,3,3,3,1,3,3,3,3,1],
[1,1,1,1,3,1,1,1,3,1,3,1,1,1,3,1,1,1,1],
[0,0,0,1,3,1,0,0,0,0,0,0,0,1,3,1,0,0,0],
[1,1,1,1,3,1,0,1,7,7,7,1,0,1,3,1,1,1,1],
[5,3,3,3,3,3,0,1,0,0,0,1,0,3,3,3,3,3,6],
[1,1,1,1,3,1,0,1,1,1,1,1,0,1,3,1,1,1,1],
[0,0,0,1,3,1,0,0,0,12,0,0,0,1,3,1,0,0,0],
[1,1,1,1,3,1,3,1,1,1,1,1,3,1,3,1,1,1,1],
[1,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,1],
[1,3,1,1,3,1,1,1,3,1,3,1,1,1,3,1,1,3,1],
[1,3,3,1,3,3,3,3,3,2,3,3,3,3,3,1,3,3,1],
[1,1,3,1,3,1,3,1,1,1,1,1,3,1,3,1,3,1,1],
[1,3,3,3,3,1,3,3,3,1,3,3,3,1,3,3,3,3,1],
[1,3,1,1,1,1,1,1,3,1,3,1,1,1,1,1,1,3,1],
[1,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

var X=0;
var Y=0;

var score=0;

var Secondes=0;
var Minutes=0;

var start=false;

var chrono=setInterval(compteur,1000);
var pacVit=setInterval(vitJoueur,200);
var tuBouges=false;

var genererFruit=setInterval(bonusFruit,40000);

var check=false;

var niveau=1; //niveau actuel

var vies=3; // Nombre de vies
var scorevies=0;

var nombreGomme=0; // Compte le nombre de pac-gommes existantes sur le terrain

var superPac=false; //Pacman est-il en mode super Pacman?

function refreshGame() {
context.fillStyle = 'rgba(0,0,0,0.6)';
context.fillRect(0,0,largeur_fenetre,hauteur_fenetre);
checkStartGenerator();
testTile();
dessinerScore();
dessinerTemps();
dessinerStart();
superPacman();
window.document.onkeydown = dirPac;
deplacePac();
indicNiveau();
dessinerVies();
checkFin();




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
		}
		
		else if (tileMap[posX][posY-1]==3)
		{
		score=score+10;
		scorevies=scorevies+10;
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		}
		
		else if (tileMap[posX][posY-1]==5){
		tileMap[posX][ltile-3]=2;	
		tileMap[posX][posY]=0;
		tuBouges=false;
		}
		
		else if (tileMap[posX][posY-1]==12){
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
		}
		
		else
		{	
		stop=false;
		tileMap[posX][posY-1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		}
		
	}
	
	
	
	else if (direction==1){
		angle=90;
		if ((tileMap[posX+1][posY]==1) || (tileMap[posX+1][posY]==7)){
			stop=true;
			tuBouges=false;
		}
		else if (tileMap[posX+1][posY]==3){
		score=score+10;
		scorevies=scorevies+10;
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		}
		
		else if (tileMap[posX+1][posY]==12){
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
		}
		
		else{
		stop=false;
		tileMap[posX+1][posY]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		}
		
		}
		
		
		
		
	else if (direction==2){
		angle=0;
		if (tileMap[posX][posY+1]==1){
			stop=true;
			tuBouges=false;
		}
		else if (tileMap[posX][posY+1]==3){
		score=score+10;
		scorevies=scorevies+10;
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		}
		else if (tileMap[posX][posY+1]==6){
		tileMap[posX][1]=2;	
		tileMap[posX][posY]=0;
		tuBouges=false;
		}
		
		else if (tileMap[posX][posY+1]==12){
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
		}

		else{
		stop=false;
		tileMap[posX][posY+1]=2;
		tileMap[posX][posY]=0;
		tuBouges=false;
		}
		
		}
		
		
		
		
	else if (direction==3){
		angle=270;
		if (tileMap[posX-1][posY]==1){
			stop=true;
			tuBouges=false;
		}
		else if (tileMap[posX-1][posY]==3){
		score=score+10;
		scorevies=scorevies+10;
		tileMap[posX-1][posY]=2;	
		tileMap[posX][posY]=0;
		tuBouges=false;
		}
		
		else if (tileMap[posX-1][posY]==12){
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
		}
		
		else{
		stop=false;
		tileMap[posX-1][posY]=2;	
		tileMap[posX][posY]=0;
		tuBouges=false;
		}
	
	
	
	
		}
		else if (direction==5){
		tuBouges=false;	
		}
}
}
	
//Fonctions des sprites
function majSprite(){
	//Mise � jour du sprite
currentFrame=++currentFrame%frameCount;
	//Calcul la coordonn�e X pour la spritesheet
srcx=currentFrame*singleSpriteWidth;	
	
	}

function dessinerPac() {

//Mise � jour du sprite	
	majSprite();
//Dessine le sprite
context.save();
context.translate(collix+6,colly+5.5);
context.rotate(angle*Math.PI/180);
context.drawImage(pacman,srcx,srcy,singleSpriteWidth,singleSpriteHeight,-16,-16,pactaille,pactaille);
context.translate(-collix,-colly);
context.restore();
}

function dessinerMur(XM,YM){
context.fillStyle = 'blue';
context.beginPath();
//Premier point
context.moveTo(XM,YM+pas); //bas gauche
//Trace les c�t�s
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
//Trace les c�t�s
context.lineTo(XP+pas, YP+(pas/4)); //bas droite
context.lineTo(XP+pas, YP); //haut droit
context.lineTo(XP, YP); //haut gauche
//Pour terminer la construction et la remplir
context.closePath();
context.fill();
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
		else
		{

		}
	}
}
}

function dessinerScore(){
	context.strokeStyle="white";
	context.lineWidth='2';
	context.font='30pt comic sans ms';
	context.strokeText("Score : " + score,325,30);
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
	context.strokeText("Temps : " + Minutes + "'" + Secondes ,0,30);
	
}

function vitJoueur(){
tuBouges=true	
}

function bonusFruit(){
if ((start==true) && (fruit==0)){
	tileMap[fruitX][fruitY]=12;
	theFruit=Math.random();
	if (theFruit<=0.02){ //Proba cl�
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
Cl� 	5 000	2%
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
	context.strokeText("Niveau " + niveau ,400,668);
	
}



function checkFin(){
	if (nombreGomme==0){
	//red�marrage niveau
		niveau=niveau+1;
		tileMap=restartMap;
		if ((Minutes*60+Secondes)*10<=2000){ // Si le temps est inf�rieur ou �gal � 2000 secondes, soit 3 minutes *10 + 20 secondes*10
			score=score+2000-((Minutes*60+Secondes)*10);
			stop=true;
			start=false;
			Minutes=0;
			Secondes=0;
		}
		else{
			
		}
	
	}
	else{
		
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
	context.strokeText("Vies : " + vies ,0,668);	
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

function superPacman(){
	if (superPac==true){
		var cooldown = setTimeout(switchSuperOff,10000);
		context.strokeStyle="white";
		context.lineWidth='2';
		context.font='30pt comic sans ms';
		context.strokeText("Super Pacman!",largeur_fenetre/2-140,hauteur_fenetre/2);
	}
	
	else{

	}
}

function switchSuperOff(){
	superPac=false;
	clearTimeout(cooldown);
	
	
	
	
	
	
	
}
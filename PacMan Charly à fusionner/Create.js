//à chaque reload
window.addEventListener('load', function () {
// On récupère l'objet canvas
var elem = document.getElementById('canvasElem');
if (!elem || !elem.getContext) {
	return;
	}
	// On récupère le contexte 2D
	context = elem.getContext('2d');
    if (!context) {
		return;
		} 
	// Boucle de rafraichissement du contexte 2D
	boucleJeu = setInterval(refreshGame, intervalTemps); //refresh tous les x ms
	}, false);
	
	//variables internes
var boucleJeu; //appelée pour refresh
var intervalTemps =50; //temps entre 2 refresh en ms
var context; //le contexte 2d
var largeur_fenetre=993;
var hauteur_fenetre=993;
var largeurgrille=32;


var longueurgrille=31;
var hauteurgrille=31;

var currentoutil=0; //0=rien, 1=bloc, 2=porte, 3=effacer, 4=pac-gommme, 5=super pac-gomme, 6=générateur de fruit, 7=téléporteur, 8=fantômes

var cerise=new Image();
cerise.src='cerise.png';

var fantôme=new Image();
fantôme.src='blinky.png'

var tileMap = new Array();

tileMap=[
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var initMap = new Array();

initMap=[
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

//0=vide	;	1=Mur	;	2=Joueur	;	3=Pac-Gomme		;	4=Super Pac-Gomme	;	5=téléportation gauche	;	6=téléportation droite	;	7=Porte fantômes
//8=Blinky	;	9=Pinky	;	10=Inky		;	11=Clyde		;	12=Générateur de bonus aléatoire

window.onload = function() {
  setInterval(choixOutil,1);
 };
 
function Reinit(){ //script de reinitialisation
	console.log(tileMap);
	context.fillStyle = "black";
	context.fillRect(0,0,largeur_fenetre,hauteur_fenetre);
	tileMap=initMap;
	document.getElementById('textgen').value = tileMap;
}


function poser(event){
  var X = Math.floor(((event.clientX)-505)/28);
  var Y = Math.floor(((event.clientY)-67)/28);
  document.getElementById('coordo').value = X + ', ' + Y;
}

function dessiner(event){
	var x = Math.floor(((event.clientX)-505)/28.75)*32;
	var y = Math.floor(((event.clientY)-67)/28.75)*32;
	
	if (currentoutil == 1){
		context.fillStyle = 'blue';
		context.beginPath();
		//Premier point
		context.moveTo(x,y+34); //bas gauche
		//Trace les côtés
		context.lineTo(x+34, y+34); //bas droite
		context.lineTo(x+34, y); //haut droit
		context.lineTo(x, y); //haut gauche
		//Pour terminer la construction et la remplir
		context.closePath();
		context.fill();
		
		var tileMapX = x/32;
		var tileMapY= y/32;
		tileMap[tileMapY][tileMapX]=1;
	}
	
	if (currentoutil == 2){
		context.fillStyle = 'orange';
		context.beginPath();
		//Premier point
		context.moveTo(x,y+(34)/4); //bas gauche
		//Trace les côtés
		context.lineTo(x+34, y+(34/4)); //bas droite
		context.lineTo(x+34, y); //haut droit
		context.lineTo(x, y); //haut gauche
		//Pour terminer la construction et la remplir
		context.closePath();
		context.fill();
		
		var tileMapX = x/32;
		var tileMapY= y/32;
		tileMap[tileMapY][tileMapX]=7;
	}
	
	if (currentoutil == 3){

		
		var tileMapX = x/32;
		var tileMapY= y/32;
		if ((tileMap[tileMapY][tileMapX]==5) || (tileMap[tileMapY][tileMapX]==6)){ // si c'est un téléporteur, on supprime des deux côtés
			context.fillStyle = 'black';
			context.beginPath();
			//Premier point
			context.moveTo(0,y+34); //bas gauche
			//Trace les côtés
			context.lineTo(0+34, y+34); //bas droite
			context.lineTo(0+34, y); //haut droit
			context.lineTo(0, y); //haut gauche
			//Pour terminer la construction et la remplir
			context.closePath();
			context.fill();
			
			context.beginPath();
			//Premier point
			context.moveTo(30*32,y+34); //bas gauche
			//Trace les côtés
			context.lineTo(30*32+34, y+34); //bas droite
			context.lineTo(30*32+34, y); //haut droit
			context.lineTo(30*32, y); //haut gauche
			//Pour terminer la construction et la remplir
			context.closePath();
			context.fill();
			
			tileMap[tileMapY][0]=0
			tileMap[tileMapY][31]=0
		}
		else{
		context.fillStyle = 'black';
		context.beginPath();
		//Premier point
		context.moveTo(x,y+34); //bas gauche
		//Trace les côtés
		context.lineTo(x+34, y+34); //bas droite
		context.lineTo(x+34, y); //haut droit
		context.lineTo(x, y); //haut gauche
		//Pour terminer la construction et la remplir
		context.closePath();
		context.fill();
		var tileMapX = x/32;
		var tileMapY= y/32;
		tileMap[tileMapY][tileMapX]=0;
		}
	}
	
	if (currentoutil == 4){
		context.beginPath();
		context.fillStyle='khaki';
		context.lineWidth="4";
		context.strokeStyle='darkkhaki';
		context.arc(x+16, y+16, 4, 0, 2 * Math.PI);
		context.closePath();
		context.stroke();
		context.fill();
		
		var tileMapX = x/32;
		var tileMapY= y/32;
		tileMap[tileMapY][tileMapX]=3;
	}
	
	if (currentoutil == 5){
		context.beginPath();
		context.fillStyle='khaki';
		context.lineWidth="4";
		context.strokeStyle='darkkhaki';
		context.arc(x+16, y+16, 7, 0, 2 * Math.PI);
		context.closePath();
		context.stroke();
		context.fill();
		
		var tileMapX = x/32;
		var tileMapY= y/32;
		tileMap[tileMapY][tileMapX]=4;
	}
	
	if (currentoutil == 6){
		context.drawImage(cerise,x,y,32,32);
		var tileMapX = x/32;
		var tileMapY= y/32;
		tileMap[tileMapY][tileMapX]=12;
	}
	
	if (currentoutil == 7){
		context.fillStyle = 'purple';
		context.beginPath();
		//Premier point
		context.moveTo(0,y+34); //bas gauche
		//Trace les côtés
		context.lineTo(0+34, y+34); //bas droite
		context.lineTo(0+34, y); //haut droit
		context.lineTo(0, y); //haut gauche
		//Pour terminer la construction et la remplir
		
		//Premier point
		context.moveTo(32*30,y+34); //bas gauche
		//Trace les côtés
		context.lineTo(32*30+34, y+34); //bas droite
		context.lineTo(32*30+34, y); //haut droit
		context.lineTo(32*30, y); //haut gauche
		context.closePath();
		context.fill();
		
		var tileMapX = x/32;
		var tileMapY= y/32;
		tileMap[tileMapY][0]=5;
		tileMap[tileMapY][31]=6;
	}
	
	if (currentoutil == 8){
		context.drawImage(fantôme,x,y,32,32);
		tileMap[tileMapY][tileMapX]=8;
	}
	
	
	
	
	
	

}


function choixOutil(){
	x=document.getElementById("image");
	if (choixOutils.Creer[0].checked){	//bloc
		x.setAttribute("src","outil1.png");
		currentoutil=1;
	}
	if (choixOutils.Creer[1].checked){	//porte
		x.setAttribute("src","outil1.png");
		currentoutil=2;
	}
	if (choixOutils.Creer[2].checked){	//effacer
		x.setAttribute("src","outil2.png");
		currentoutil=3;
	}
	if (choixOutils.Creer[3].checked){	//pac-gomme
		x.setAttribute("src","outil3.png");
		currentoutil=4;
	}
	if (choixOutils.Creer[4].checked){	//super pac-gomme
		x.setAttribute("src","outil4.png");
		currentoutil=5;
	}
	if (choixOutils.Creer[5].checked){	//generateur de fruits
		x.setAttribute("src","outil5.png");
		currentoutil=6;
	}
	if (choixOutils.Creer[6].checked){	//teleporteurs
		x.setAttribute("src","outil6.png");
		currentoutil=7;
	}
	if (choixOutils.Creer[7].checked){	//fantomes
		x.setAttribute("src","outil7.png");
		currentoutil=8;
	}
	
}

function refreshGame(){
		
	for (i=0;i<largeur_fenetre/largeurgrille;i++){
	context.fillStyle="white";
	context.fillRect(i*largeurgrille,0,1,5000);
	}
	
	
	for(j=0;j<hauteur_fenetre/largeurgrille;j++){
	context.fillStyle="white";
	context.fillRect(0,j*largeurgrille,5000,1);		
	}
}

function Generate(){
	document.getElementById('textgen').value = tileMap;
}
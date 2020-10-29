var nb_colonnes = 30;
var nb_lignes = 30; 
var taillecarre = 20; // en pixels
var vitesse = 100;

var score = document.getElementById("score");
var canvas = document.getElementById("grille");
var context = canvas.getContext("2d");

canvas.width=nb_colonnes*taillecarre;
canvas.height=nb_lignes*taillecarre;



const bout = document.getElementById("b1");

bout.addEventListener("click",() => { // clic bouton

    var snake=[[4,3],[3,3],[2,3],[1,3],[0,3]]; //définit le snake
    var directionAbs=1; //définit la direction de départ du serpent ici vers le bas du canvas
    var directionOrd=0;

    function fill(){
        
        context.clearRect(0,0,canvas.width,canvas.height);

    

        for(var i=0;i<snake.length;i++){
            context.fillStyle="#FF7F00"; //couleur en hexa des pixels
            context.fillRect(snake[i][0]*taillecarre,snake[i][1]*taillecarre,taillecarre,taillecarre); //rempli le serpent 
        }
    
        context.fillStyle="#FF0000" // idem en rouge pour la pomme
        context.fillRect(pomme[0]*taillecarre,pomme[1]*taillecarre,taillecarre,taillecarre);	//rempli la pomme
    }
    
    
    
    window.onkeydown=function(event){ // définition des events sur le clic de chque fleche clavier
        switch (event.key) {
            case "Gauche":
                if(directionAbs==0){  //on verifie que le snake a une direction d'abscisse nul car sinon c'est inutile de se deplacer a gauche meme principe pour la droite ect..
                    directionAbs=-1;
                    directionOrd=0
                    console.log("test gauche"); // ma valeur ne s'affiche pas dans la console mon navigateur ne detecte pas l'event sur la touche 
                }
                break;
            case "Droite":
                if(directionAbs==0){ 
                    directionAbs=1;
                    directionOrd=0
                }
                break;
            case "Haut":
                if(directionOrd==0){ 
                    directionAbs=0;
                    directionOrd=-1
                }
                break;
            case "Bas":
                if(directionOrd==0){ 
                    directionAbs=0;
                    directionOrd=1;
                    console.log("test bas");
                }
                break;
        }
    }
    
    
    function setPomme(){ //grace a la fonction random,on définit une position aléatoire pour notre pomme avec une valeur d'abscisse et d'ordonnée
        
        
            var pommeabs = 1+Math.floor((nb_colonnes-2)*Math.random());
            var pommeord = 1+Math.floor((nb_lignes-2)*Math.random());
            pomme=[pommeabs, pommeord];
            
            
        
    }	
    
    
    function jeu(){
        var tete=[snake[0][0]+directionAbs,snake[0][1]+directionOrd]; // = tete du serpent
        
        
        if(tete[0]==-1||tete[0]==nb_colonnes||tete[1]==-1||tete[1]==nb_lignes) { //si la tete du serpent = limite de la zone
            return false;
        } 
    
        
        for(var i=0; i<snake.length;i++) {
            if((tete[0]==snake[i][0])&&(tete[1]==snake[i][1])) { //si le snake touche son propre "corps"
                return false;
            }
        }
    
       
        if((tete[0]==pomme[0])&&(tete[1]==pomme[1])){ // si tete est sur une pomme appele la fonction pomme
            setPomme();
            score(snake.length-4);
        }else{
            snake.pop(); //pop enleve le dernier element a l'array donc le snake ne "grossit" pas
        }
    
        snake.unshift(tete); //agrandit de 1 l'element snake au debut de l'array grace a unshift et renvoi vrai
        return true;

        
    }
    

    function reloadsnake(){
        if(jeu()==true){
            fill(); // rapelle la fonction fill si les condition des "regles" du jeu du snake sont bien rempli = pas dans un mur ou lui meme
        } else{
            fin();
        }
    }
    
    setPomme();
    var tempsrepet=setInterval(reloadsnake,vitesse); // définit la vitesse du jeu ici on fixe 100 dans les constantes au debut 
    
    function fin(){
        clearInterval(tempsrepet);
        alert( "Perdu");
        location.reload(); // recharge grace a reload
    }
})












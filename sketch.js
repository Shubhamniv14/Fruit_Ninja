//Creating Sprites, gameStates and a scoreboard
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var sword;

var swordImage;
var alienImage;
var alienImage2;
var alienGroup;
var fruitImage1;
var fruitImage2;
var fruitImage3;
var fruitIage4;
var fruitGroup;
var gameOver;
var gameOverImage;
var boy;
var boyImage;
var swooshSound, gameOverSound;



function preload(){
  //Loading Images for sprites
  swordImage=loadImage('sword.png');
  alienImage=loadImage('alien1.png');
  alienImage2=loadImage('alien2.png');
 fruitImage1=loadImage('fruit1.png');
 fruitImage2=loadImage('fruit2.png'); 
  fruitImage3=loadImage('fruit3.png');
  fruitImage4=loadImage('fruit4.png');
  gameOverImage=loadImage('gameover.png');
    
  boyImage=loadImage('pointboy.png');
  swooshSound=loadSound('knifeSwooshSound.mp3');
  gameOverSound=loadSound('gameover.mp3');
}

function setup(){
  //Creating Canvas
 createCanvas(500,500);
  //giving positions,sizes and adding images to the sprites
  sword=createSprite(250,250,15,15);
  sword.addImage('sword',swordImage);
  sword.scale=0.5;
  //Creating Groups
  aliensGroup= new Group();
  fruitGroup= new Group();
  sword.debug=true;
 boy=createSprite(110,30,15,15);
boy.addImage(boyImage);  
  boy.scale=0.3;
  gameOver=createSprite(0,600,15,15);
  gameOver.addImage(gameOverImage);
  
  
}

function draw(){
  //Setting the color of the background
  background('lightblue');
  //Creating the text on the canvas and giving it colors and size
  textSize(17);
  fill('blue');
  text('Score:'+score,140,30);
  if(gameState===PLAY){
    gameOver.visible=false;
    
     
  if(sword.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    swooshSound.play();
    score=score+2
    
  }
   sword.y=mouseY;
  sword.x=mouseX; 
    spawnAliens();
  spawnFruits();
   if(sword.isTouching(aliensGroup)){
     gameOverSound.play();
     gameState=END;
     
   }
    
    
    
  }else if(gameState===END){
    fruitGroup.setLifetimeEach(-1);
   aliensGroup.setLifetimeEach(-1);
    fruitGroup.setVelocityXEach(0);
    aliensGroup.setVelocityEach(0);
    fruitGroup.visibleEach=false;
    aliensGroup.visibleEach=false;
    sword.visible=false;
    gameOver.x=250;
    gameOver.y=250;
    gameOver.visible=true;
    
   
    
    
    
  }
  
  
  console.log('Fruit'+'Ninja');
 
  
  
drawSprites();
}
function spawnAliens(){
  if(frameCount%120===0){
    var alien=createSprite(500,Math.round(random(150,450)),15,15);
    alien.addImage('alien1',alienImage);
    alien.addImage('alien2', alienImage2);
    position2=Math.round(random(3,4))
      
    if(position2===3){
      alien.x=500;
      alien.velocityX=-(6+score/10);  
      
      
    }else if(position2===4){
     alien.x=0; 
     alien.velocityX=+(6+score/10); 
    }
    aliensGroup.add(alien);
 
    alien.lifetime=83;
    
  } 
  
}
function spawnFruits(){
  if(frameCount%100==0){
     var fruit=createSprite(500,Math.round(random(150,450)),15,15);
    fruit.scale=0.2;
    fruit.lifetime=83;
    
    select_fruit=Math.round(random(1,4));
    position=Math.round(random(1,2));
    if(position===1){
       fruit.x=500;
     fruit.velocityX=-(6+score/4); 
     
    }else if(position===2){
      fruit.x=0;
      fruit.velocityX=+(6+score/4);
      
    }
   if(select_fruit===1){
     fruit.addImage(fruitImage1);
   } else if(select_fruit===2){
     fruit.addImage(fruitImage2);
   }else if(select_fruit===3){
     fruit.addImage(fruitImage3);
   }else if(select_fruit===4){
    fruit.addImage(fruitImage4);
   }
   fruitGroup.add(fruit); 
    
    
    
}
}
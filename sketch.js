//Game State
var sword,swordImage,enemyGroup,enemyImage,fruit1,fruit2,fruit3, 
    fruit4 ,fruitGroup,
fruit1Image,fruit2Image,fruit3Image,fruit4Image,score,gameOverImage;
var PLAY=1;
var END=0;
var gameState=PLAY;
var fruitGroup;
var enemyGroup;  
var gameOverSound,knifeSound;

function preload(){
swordImage=loadImage("sword.png") ;
  
enemyImage=loadAnimation("a1.png","a2.png");
  
fruit1Image=loadImage("fruit1.png") ;
  
fruit2Image=loadImage("fruit2.png");
  
fruit3Image=loadImage("fruit3.png");
  
fruit4Image=loadImage("fruit4.png") ; 
  
gameOverImage=loadImage("gameover.png");
  
gameOverSound= loadSound("gameover.mp3")

knifeSound=loadSound("knifeSwoosh.mp3")

 

}

function setup(){
 createCanvas(600,600);
  
sword=createSprite(200,200,100,70) ;
sword.addImage(swordImage);
sword.scale=1;
  
fruitGroup=createGroup();
enemyGroup=createGroup();
score=0;
    
}



function draw(){
background("pink")
  
if(gameState===PLAY){
sword.x=World.mouseX;
sword.y=World.mouseY;
  fruits();
  enemy();
  
  
if(fruitGroup.isTouching(sword)){
 fruitGroup.destroyEach();
 score=score+2;
knifeSound.play();  
}  

else if(enemyGroup.isTouching(sword)){
  
  gameState=END;
 gameOverSound.play(); 
   enemyGroup.destroyEach();
  fruitGroup.destroyEach();
  enemyGroup.setVelocityXEach(0);
  fruitGroup.setVelocityXEach(0);
  
  sword.addImage(gameOverImage)
  sword.scale=2;
  sword.x=300;
  sword.y=200;
  
}   
}  
  
drawSprites();
  
text("score:"+score,500,50);
    
}

function fruits(){
 if(World.frameCount%80===0){
 position=Math.round(random(1,2));
 fruit=createSprite(400,200,20,20) ;
 fruit.scale=0.2;
 
  var rand=Math.round(random(1,4));
  if(rand===1){
   fruit.addImage(fruit1Image);
  } else if(rand===2){
   fruit.addImage(fruit2Image);
}else if(rand===3){
  fruit.addImage(fruit3Image); 
}else {
  fruit.addImage(fruit4Image);
}
  
if(position===1){
fruit.x=400;
fruit.velocityX=-(7+(score/4) ) ;
}   
else 
  if(position===2){
fruit.x=0;
fruit.velocityX=-(7+(score/4));    
  }
   
     
 fruit.y=Math.round(random(50,340));
   
fruit.velocityX=-7;
fruit.setlifetime=100;
   
fruitGroup.add(fruit) ;    
  } 
 } 

function enemy(){
if(World.frameCount%100===0){
  var enemy = createSprite(600,Math.round(random(30,400)),10,10)
  
enemy.addAnimation("enemy_blinking",enemyImage)
enemy.velocityX=-(8+(score/10));
enemy.scale=0.75;
enemy.lifetime=150;
enemyGroup.add(enemy) ; 
}  
}



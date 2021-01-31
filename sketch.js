
var monkey , monkey_running,mokeyStop;
var banana ,bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground,groundImage;
var invisibleGround;
var score = 0;
var gameState = "play";
var obstaclesGroup;
var gameOver,gameOverImage;
var retry,retryImage;
var points=0;
var bananaImage;
var bananaGroup;
function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkeyStop = ("Monkey_01.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("jungle.jpg");
 
  gameOverImage = loadImage("images.jpg");
  
  retryImage = loadImage("retry.png");
  
  bananaImage = loadImage("banana.png");
  winningImg = loadImage("you win.jpg");
}



function setup() {
  createCanvas(400,400);

  camera.x=camera.x+200;
  camera.y=camera.y+300;

  ground = createSprite(camera.x,camera.y-100,400,10);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;

  monkey = createSprite(camera.x-136,camera.y,20,200);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  monkey.addAnimation("monkeyStop",monkeyStop);
  
  invisibleGround = createSprite(camera.x,camera.y+45,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  
  gameOver = createSprite(camera.x,camera.y,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  youwin = createSprite(camera.x,camera.y,10,10);
  youwin.addImage(winningImg);
  youwin.scale=0.6;
  youwin.visible = false;
  
  monkey.setCollider("circle",0,0,150);
  
  
  retry = createSprite(camera.x,camera.y+70,10,10);
  retry.addImage(retryImage);
  retry.scale = 0.2;
  retry.visible = false;

  bananaGroup = createGroup();

}

function draw() {
  background(220);
 
  if(gameState==="play"){
       score = score + Math.round(getFrameRate()/61);
     ground.velocityX = -4;
  if(ground.x<camera.x-100){
   ground.x = ground.width/2;
  }
    
      monkey.velocityY = monkey.velocityY+0.5;
 
      monkey.collide(invisibleGround);
  obstacles();
    bananas();
    
    if(monkey.isTouching(bananaGroup)){
    points = points+1;
    monkey.scale= monkey.scale+0.01111;
      bananaGroup.destroyEach();
      obstaclesGroup.destroyEach();
    }
     if(keyDown("space") && monkey.y>=camera.y){
    monkey.velocityY = -12;
  }
    
 if(monkey.isTouching(obstaclesGroup)){
  points=points-2;
   monkey.scale= monkey.scale-0.02222;
   bananaGroup.destroyEach();
      obstaclesGroup.destroyEach();
 }
    switch(points){
        case 10: monkey.scale= monkey.scale+0.0001111;
        break;
        case 20: monkey.scale= monkey.scale+0.0002222;
        break;
        case 30: monkey.scale= monkey.scale+0.0003333;
        break;
        default: break;
    }
  if(monkey.scale<0.06|| points<-4){
    gameState= "end"
  }
}
  drawSprites();
  fill("red");
  textSize(20);
  text("SCORE 100+ OR 10 POINTS TO WIN",camera.x-170,camera.y-150)
  fill("darkblue");
  textSize(20);

  text("SCORE: "+score,camera.x+60,camera.y+150);
  text("POINTS: "+points,camera.x-150,camera.y+150);
  
    if(points>=10 || score>=100){
    gameState= "win"
    }

   if(gameState === "end"){
   
   gameOver.visible = true;
     retry.visible = true;
   
   monkey.velocityY=0;
   ground.velocityX = 0;
        
   
   fill("white");
   text("SCORE: "+score,camera.x,camera.y-50);
   text("Press Reload Button to \nrestart!!",camera.x-100,camera.y-180);
     text("POINTS: "+points,camera.x-120,camera.y-50);
   
   obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);   
     monkey.changeAnimation("monkeyStop",monkeyStop);
   
   obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
 }
 if (gameState === "win"){
     youwin.visible=true;
     retry.visible=true;

     monkey.velocityY=0;
     monkey.velocityX=0;
     ground.velocityX=0;

     fill("red");
 
     text("Press Replay Button to restart!!",camera.x-120,camera.y-100);

       
       obstaclesGroup.setLifetimeEach(-1);
       bananaGroup.setLifetimeEach(-1);   
       monkey.changeAnimation("monkeyStop",monkeyStop);
     
     obstaclesGroup.setVelocityXEach(0);
       bananaGroup.setVelocityXEach(0);
      } 

  if(mousePressedOver(retry)){
    restart();
  }
}
function obstacles(){

   if(frameCount % 80 === 0){

             var obstacle = createSprite(camera.x+200,camera.y+26,10,10);
             obstacle.addImage("obstacle",obstacleImage);
             obstacle.scale = 0.15;
             obstacle.velocityX = -(4+score/100);
             obstacle.lifetime = 100;
     //obstacle.debug= true;
     obstacle.setCollider("circle",0,0,150)
     
     var rand = Math.round(random(1,4));
     
     switch(rand){
      
             case 1: obstacle.scale = 0.1;
                     break;
             case 2:obstacle.scale = 0.20;
                    break;
             case 3: obstacle.scale = 0.25;
                     break;
             case 4: obstacle.scale = 0.15;
                     break;
             default:break;
     
     }
     
     obstaclesGroup.add(obstacle);
     
   }
   
  
}

function restart(){
        gameState = "play";
        retry.visible = false;
        gameOver.visible = false;
        youwin.visible = false;
        obstaclesGroup.destroyEach();
        monkey.changeAnimation("monkey",monkey_running);
        monkey.scale=0.1;
        score = 0;
        points = 0;

}
function bananas(){
  if(frameCount % 80 === 0){
        var banana = createSprite(camera.x+200,camera.y-70,10,10);
        banana.addImage(bananaImage);
        banana.velocityX= -(4+score/100);
        banana.scale=0.09;
        bananaGroup.add(banana);
  }


}

var Score = 0
var trex ,trex_running;
var PLAY = 1
var END = 0
var gameState = PLAY
var NotTouching
var Clouds
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  imagen = loadImage ("ground2.png")
  Sky = loadImage ("cloud.png")
  CollideImage1 = loadImage ("obstacle1.png")
  CollideImage2 = loadImage ("obstacle2.png")
  CollideImage3 = loadImage ("obstacle3.png")
  CollideImage4 = loadImage ("obstacle4.png")
  CollideImage5 = loadImage ("obstacle5.png")
  CollideImage6 = loadImage ("obstacle6.png")
  trex_jumpSound = loadSound("jump.mp3")
  trex_dieSound = loadSound("die.mp3")
  trex_checkSound = loadSound("checkPoint.mp3")
  trexDie = loadImage ("restart.png")
  GAMEOVER = loadImage ("gameOver.png")
  trex_die = loadAnimation("trex_collided.png")
}

function setup(){
  createCanvas(600,200)
  Deserto = createSprite (300,185)
  Deserto.addImage (imagen)
  //crie um sprite de trex
  trex = createSprite(45,150,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5
  Invisible = createSprite (300,190,600,10)
  Invisible.visible = false
  Score = 0
  NotTouching = createGroup()
  Clouds = createGroup()
  trex.setCollider("rectangle",0,0,73,70)
  GAMEOVER2 = createSprite (width/2,height / 2)
  GAMEOVER2.scale = 0.8
  GAMEOVER2.addImage (GAMEOVER)
  Restart = createSprite (width/2,height / 2 + 35)
  Restart.scale = 0.6
  Restart.addImage (trexDie)
  trex.addAnimation("OVER", trex_die);
}

function draw(){
  background("white")
  drawSprites()
  trex.collide (Invisible)
  textSize (20)
  fill ("black")
  text ("Score: " + Score,450,90)
  if (gameState === PLAY){
    if (Deserto.x < 0){
      Deserto.x = Deserto.width /2
    }
    trex.velocityY = trex.velocityY + 0.7
  if (keyDown("space")&&trex.y >=160){
    trex.velocityY = -10.8
    trex_jumpSound.play()
  }
  Deserto.velocityX = -(6 + (Score/100))
  Score = Score +Math.round(getFrameRate()/60)
  Spawner ()
  CollideSpawner ()
  if (NotTouching.isTouching(trex)){
   gameState = END
   trex_dieSound.play()
  }
   GAMEOVER2.visible = false
   Restart.visible = false
  }
  else if(gameState === END){
    Deserto.velocityX = 0
    NotTouching.setVelocityXEach(0)
    Clouds.setVelocityXEach(0)
    NotTouching.setLifetimeEach(-1)
    Clouds.setLifetimeEach(-1)
    GAMEOVER2.visible = true
   Restart.visible = true
   trex.velocityY = 0
   trex.changeAnimation("OVER",trex_die)
   if(mousePressedOver(Restart)){
    reset()
   }
  }
}
function reset(){
  gameState = PLAY
   NotTouching.destroyEach()
    Clouds.destroyEach()
     trex.changeAnimation ("running",trex_running)
       Score = 0
       
}
function Spawner(){
 if (frameCount % 125 === 0){
  Cloud = createSprite (width,Math.round(random(70,150)))
  Cloud.addImage(Sky)
  Cloud.scale = 0.5
  Cloud.velocityX = -3
  Cloud.lifetime = 215
  Cloud.depth = trex.depth
  trex.depth = trex.depth +1
  Clouds.add(Cloud)
 }
 }
 function CollideSpawner(){
    if (frameCount % 60 === 0){
      Cacto = createSprite (width,170)
      Cacto.velocityX = -(6 + (Score/100))
      NotTouching.add(Cacto)
    var N = Math.round(random(1,6))
    
    switch (N){
     case 1:
      Cacto.addImage (CollideImage1)
      Cacto.setCollider("rectangle",0,0,50,50)
      break
     case 2:
      Cacto.addImage (CollideImage2)
      break
     case 3:
      Cacto.addImage (CollideImage3)
      Cacto.setCollider("rectangle",0,0,70,70)
      break
     case 4:
      Cacto.addImage (CollideImage4)
      break
     case 5:
      Cacto.addImage (CollideImage5)
      Cacto.setCollider("rectangle",0,0,70,70)
      break
     case 6:
      Cacto.addImage (CollideImage6)
      Cacto.setCollider("rectangle",0,0,100,70)
      break
    }
   Cacto.scale = 0.5
   Cacto.lifetime = 200
    }
   
 }
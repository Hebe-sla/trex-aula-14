var trex, trex_running, edges;
var groundImage ,chao;
var chaoinvisivel
var nuvem, nuvem2
var obstaculos, cacto1,cacto2,cacto3,cacto4,cacto5,cacto6
var score=0
var grupodenuvens,grupodecactos;
var estadodejogo="inicio"
var trexassustado

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvem = loadImage("cloud.png")
  cacto1=loadImage("obstacle1.png")
  cacto2=loadImage("obstacle2.png")
  cacto3=loadImage("obstacle3.png")
  cacto4=loadImage("obstacle4.png")
  cacto5=loadImage("obstacle5.png")
  cacto6=loadImage("obstacle6.png")
  trexassustado=loadImage("trex_collided.png")
 }

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(60,170,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("trexassustado",trexassustado)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  chao= createSprite(300,180)
  chao.addImage(groundImage)
  chaoinvisivel= createSprite(100,190,200,15)
  chaoinvisivel.visible=false
  grupodenuvens=new Group()
    grupodecactos=new Group()
  
}


function draw(){
  //definir a cor do plano de fundo 
  background("pink");
  text ("pontos "+score,500,20)
  //registrando a posição y do trex
  console.log(trex.y)
  if (estadodejogo==="inicio") {
  
    //pular quando tecla de espaço for pressionada
  if(keyDown("space")&&trex.y>140){
    trex.velocityY = -10;

  }
  
  trex.velocityY = trex.velocityY + 0.5;
 chao.velocityX=-10
  if (chao.x<0){
  chao.x=chao.width/2
}
 criadordenuvens()
  criadordecactos()
  if(trex.isTouching){ 
    estadodejogo="game over ;-;"
  }
}
else if(estadodejogo==="game over ;-;"){ 
chao.velocityX=0
grupodecactos.setVelocityXEach(0)
grupodenuvens.setVelocityXEach(0)
trex.changeAnimation("trexassustado",trexassustado)
}

  

 //impedir que o trex caia
  trex.collide(chaoinvisivel)

  drawSprites();
 
}
function criadordenuvens(){
  if (frameCount%50===0){
  nuvem2=createSprite(610,100)
  nuvem2.addImage(nuvem)
  nuvem2.velocityX=-5
  nuvem2.y=Math.round(random(5,140))
  nuvem2.depth=trex.depth
  trex.depth=trex.depth+1
  nuvem2.lifetime=150
  grupodenuvens.add(nuvem2)
}
}
function criadordecactos(){
  if (frameCount%50===0){
    obstaculos= createSprite(610,170)
    obstaculos.velocityX=-5
    obstaculos.scale=0.7 
    var escolha=Math.round(random(1,6))
    switch (escolha) {
      case 1:obstaculos.addImage(cacto1)
        break;
       case 2:obstaculos.addImage(cacto2)
        break;
       case 3:obstaculos.addImage(cacto3)
        break;
       case 4:obstaculos.addImage(cacto4)
        break;
       case 5:obstaculos.addImage(cacto5)
        break;
      case 6:obstaculos.addImage(cacto6)
        break;
      default:
        break;

    }
    obstaculos.lifetime=150
    grupodecactos.add(obstaculos)
}
}
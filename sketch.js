const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground,leftWall,rightWall;
var bridge,jointPoint,jointLink;
var stones = [];

var zombie,zombieImg;
var backgroundImg;

function preload(){
  backgroundImg = loadImage("assets/background.png");
  zombieImg = loadImage("assets/zombie.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20, "#795548");
  leftWall = new Base(150, height / 2 + 50, 300, 100, "#8d6e63");
  rightWall = new Base(width - 150, height / 2 + 50, 300, 100, "#8d6e63");

  bridge = new Bridge(17, { x: 240, y: height / 2 })
  jointPoint = new Base(width - 300, height / 2 + 10, 40, 20, "#8d6e63", true);

  Matter.Composite.add(bridge.body,jointPoint);
  jointLink = new Link(bridge,jointPoint);

  for(var i= 0; i<50 ; i++){
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 20);
    stones.push(stone);
  }

  zombie = createSprite(width/2-250, ground.body.position.y-75 );
  zombie.addAnimation("ZI",zombieImg);
  zombie.scale = 0.15;
  zombie.velocityX = 2;

  breakButton = createButton("");
  breakButton.position(250,height/2-30);
  breakButton.class("breakbutton");
  //breakButton.mousePressed(handleButtonPress);
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(51);
  Engine.update(engine);

  image(backgroundImg,0,0,width,height);

  ground.display();
  leftWall.display();
  rightWall.display();
  //jointPoint.display();

  bridge.show();

  for(var i=0; i<stones.length;i++){
    stones[i].display();
  }

  drawSprites();
}

function handleButtonPress() {
  console.log("Inside function");
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;
var treeObj, stoneObj,groundObject, slingShot;
var mango1, mango2, mango3, mango4, mango5;
var world,boy;
var stoneReleased = false;

function preload(){
	boy=loadImage("boy.png");
  }

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	mango1=new mango(1100,100,24);
	mango2 = new mango(1115, 55, 30);
	mango3 = new mango(1000, 75, 24);
	mango4 = new mango(1010, 132, 24);
	mango5 = new mango(890, 165, 33);
	mango6 = new mango(890, 230, 33);
	mango7 = new mango(1000, 225, 24);
	mango8 = new mango(1190, 210, 33);
	mango9 = new mango(1090, 230, 30);
	mango10 = new mango(1150, 140, 24);
	mango11 = new mango(1125, 160, 30);
	treeObj=new tree(1050,580);
	groundObject=new ground(width/2,600,width,20);
	stoneObj = new Stone(230, 350, 25);
	slingShot = new SlingShot(stoneObj.body, {x: 235, y: 410});
	Engine.run(engine);

}

function draw() {

  background(rgb(150, 223, 235));
  fill(0);
  textFont("Lucida Calligraphy");
  textSize(15);
  if(mango1.body.position.y > 450 && mango2.body.position.y > 450 && mango3.body.position.y > 450 &&
      mango4.body.position.y > 450 && mango5.body.position.y > 450 && mango6.body.position.y > 450 && 
      mango7.body.position.y > 450 && mango8.body.position.y > 450 && mango9.body.position.y > 450 && 
      mango10.body.position.y > 450 && mango11.body.position.y > 450)
  {
    background(rgb(255, 252, 74));
    textSize(25);
    text("Well Played !! You helped Juno pluck all the mangoes !!", 350, 300);
  }
  else{
  text("Drag the MOUSE to stretch the catapult and aim at a mango.", 50, 50); 
  text("Release the MOUSE to shoot the stone.", 50, 100);
  text("Press SPACE Arrow Key to shoot the stone again.", 50, 150);
  image(boy ,200,340,200,300);
  
  detectCollision(stoneObj, mango1);
  detectCollision(stoneObj, mango2);
  detectCollision(stoneObj, mango3);
  detectCollision(stoneObj, mango4);
  detectCollision(stoneObj, mango5);
  detectCollision(stoneObj, mango6);
  detectCollision(stoneObj, mango7);
  detectCollision(stoneObj, mango8);
  detectCollision(stoneObj, mango9);
  detectCollision(stoneObj, mango10);
  detectCollision(stoneObj, mango11);

  treeObj.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();
  mango8.display();
  mango9.display();
  mango10.display();
  mango11.display();
  groundObject.display();
  stoneObj.display();
  slingShot.display();
  }
}

function mouseDragged()
{ 
  if(stoneReleased === false)
    Matter.Body.setPosition(stoneObj.body, {x:mouseX, y:mouseY});
}

function mouseReleased()
{
  stoneReleased = true;
    slingShot.fly();
}

function keyPressed()
{
	if(keyCode === 32)
	{
    stoneReleased = false;
    Matter.Body.setPosition(stoneObj.body, {x:230, y:350});
    slingShot = new SlingShot(stoneObj.body, {x: 235, y: 410});
    slingShot.attach(stoneObj.body);
	} 
}

function detectCollision(lStone, lMango)
{
	mangoBodyPosition = lMango.body.position;
	stoneBodyPosition = lStone.body.position;

	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);
	if(distance <= lMango.r + lStone.r)
	{
    Matter.Body.setStatic(lMango.body, false);
  }
}
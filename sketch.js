//p5 canvas setup
let cnv;
let root;

function initializeCanvas(){
  root = createDiv();
  root.id('root');
  cnv = createCanvas(800, 600);
  cnv.parent(root);
  root.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  pixelDensity(1);
}

//matter-js engine setup
const {
  Engine,
  World,
  Bodies,
  Composite,
  Constraint,
  Mouse,
  MouseConstraint
} = Matter;
let mConstraint;
const engine = Engine.create();
const world = engine.world;

function initializeMatterjs(){
  engine.gravity.scale = 0;
  let canvasMouse = Mouse.create(cnv.elt);
    let options = {
        mouse: canvasMouse,
        constraint: {
          stiffness: 1
      }
    }
    canvasMouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint)
}

// Game data setup
let player;
let herd = [];
let sheepSprite;
let sheepData;
let sheepSheet;
let backgroundImg;
let blackhole;
let blackholeSprite;
let blackholeSheet;
let blackholeData;

function initializeSprites(){
  sheepSprite = new Sprite(sheepSheet,sheepData);
  // shepherdSprite = new Sprite(shepherdSheet, shepherdData);
  blackholeSprite = new Sprite(blackholeSheet,blackholeData);
}

function initilaizeGameWorld(){
  //character
  player = new Shepherd(width/2, height/2, world);
  for (let i = 0; i < 20; i++) {
    const sheep = new Sheep(random(0, width), random(0, height), world);
    herd.push(sheep);
  }
  //add black hole
  blackhole = new Blackhole(random(50,400),random(50,300),100,blackholeSprite);
  //add world boundary
  const boundaries = new Boundary(width,height);
}

// Mouse stuff
let startTime;
let isLongPress = false;

function mousePressed(event){ 
  startTime = frameCount;
  isLongPress = false;
  return false;
}

function mouseReleased(){
  let duration = frameCount - startTime;
  if (duration <= 7){
    for (let i = 0; i < herd.length; i++){
      herd[i].clicked(i);
    }
  }
  return false;
}

// P5 MAIN FUNCTIONS
function preload() {
  sheepData = loadJSON('assets/sheep_sprite.json');
  sheepSheet = loadImage('assets/sheep_sprite_sheet.png');
  //shepherdData = loadJSON('assets/shepherd_sprite.json');
  //shepherdSheet = loadImage('assets/shepherd_sprite_sheet.png');
  backgroundImg = loadImage("assets/space-2.png");

  blackholeSheet = loadImage('assets/blackhole_sprite_sheet.png');
  blackholeData = loadJSON('assets/black_hole_sprite.json')
}

function setup() {
  initializeCanvas();
  initializeSprites();
  initializeMatterjs();
  initilaizeGameWorld();
  rectMode(CENTER); // this is to match up with matter.js
  frameRate(30);
}

function draw() {
  image(backgroundImg, 0, 0, 800, 600)
  Engine.update(engine);
  blackhole.show();
  blackhole.inBound(herd);
  for (let sheep of herd) {
    sheep.run(herd);
  };
  player.update();
  player.draw();
  
}
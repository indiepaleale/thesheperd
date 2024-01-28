//p5 canvas setup
let cnv;
let root;
let player;

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
engine.gravity.scale = 0;
const world = engine.world;

function initializeMatterjs(){
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
let herd = [];
let sheepSprite;
let sheepData;
let sheepSheet;
let backgroundGrass;
let explosion;
let bomb;
let exploded = false;
let shepherdCrystal;

function initializeSprites(){
  sheepSprite = new Sprite(sheepSheet,sheepData);
  shepherdSprite = new Sprite(shepherdSheet, shepherdData);
}

function initilaizeGameWorld(){
  //character
  player = new Shepherd(width/2, height/2, world);
  for (let i = 0; i < 120; i++) {
    const sheep = new Sheep(random(0, width), random(0, height), world);
    herd.push(sheep);
  }
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
  shepherdCrystal = loadImage('assets/shepherd_sprite/crystal.png');
  shepherdData = loadJSON('assets/shepherd_sprite/shepherd_sprite.json');
  shepherdSheet = loadImage('assets/shepherd_sprite/shepherd_sprite_sheet.png');
  backgroundGrass = loadImage("grass.png");
  explosion = loadImage('assets/explosion.gif');
}

function setup() {
  initializeCanvas();
  initializeSprites();
  initializeMatterjs();
  initilaizeGameWorld();
  rectMode(CENTER); // this is to match up with matter.js
}

function draw() {
  image(backgroundGrass, 0, 0, 800, 600);
  Engine.update(engine);
  for (let sheep of herd) {
    sheep.run(herd);
  }

  if (exploded) {
    // console.log('exploded.');
    push();
    imageMode(CENTER);
    image(explosion, mouseX, mouseY, 0.3 * explosion.width, 0.3 * explosion.height);
    setTimeout(exploded = false, World.remove(world, bomb), 3000);
    pop();
  }
  
  // setTimeout(exploded = false, 3000);

  player.update();
  player.draw();
}
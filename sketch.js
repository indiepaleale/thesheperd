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
  pixelDensity(4);
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

function initializeSprites(){
  sheepSprite = new Sprite(sheepSheet,sheepData);
  // shepherdSprite = new Sprite(shepherdSheet, shepherdData);
}

function initilaizeGameWorld(){
  //character
  player = new Shepherd(width/2, height/2, world);
  for (let i = 0; i < 100; i++) {
    const sheep = new Sheep(random(0, width), random(0, height), world);
    herd.push(sheep);
  }
  //add world boundary
  const boundaries = new Boundary(width,height);
}

// P5 MAIN FUNCTIONS
function preload() {
  sheepData = loadJSON('assets/sheep_sprite.json');
  sheepSheet = loadImage('assets/sheep_sprite_sheet.png');
  //shepherdData = loadJSON('assets/shepherd_sprite.json');
  //shepherdSheet = loadImage('assets/shepherd_sprite_sheet.png');
  backgroundGrass = loadImage("grass.png");
}

function setup() {
  initializeCanvas();
  initializeSprites();
  initializeMatterjs();
  initilaizeGameWorld();
  rectMode(CENTER); // this is to match up with matter.js
}

function draw() {
  image(backgroundGrass, 0, 0, 800, 600)
  Engine.update(engine);
  for (let sheep of herd) {
    sheep.run(herd);
  };
  player.update();
  player.draw();
}
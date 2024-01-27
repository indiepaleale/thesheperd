//p5 canvas setup
let cnv;
let root;
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

let herd = [];


const engine = Engine.create();
engine.gravity.scale = 0;
const world = engine.world;

let mConstraint;



function setup() {
  //create canvas
  root = createDiv();
  root.id('root');
  cnv = createCanvas(800, 600);
  cnv.parent(root);
  root.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  //CENTER mode is used with matter-js
  rectMode(CENTER)

  for (let i = 0; i < 100; i++) {
    const sheep = new Sheep(random(0, width), random(0, height), world);
    herd.push(sheep);
  }
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

function draw() {
  Engine.update(engine);
  background(220);
  
  for (let sheep of herd) {
    sheep.draw();
  }
  ;
}

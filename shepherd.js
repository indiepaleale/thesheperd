const W = 87;
const A = 65;
const S = 83;
const D = 68;

class Shepherd{
    constructor(x, y, world){
        this.direction = createVector();
        this.position = createVector(x, y);
        this.speed = 5;
        this.size = 70;
        this.tool = new Crook(x + 100, y + 100, world);
        const options = {
            friction: 1000,
        };
        this.body = Bodies.rectangle(x, y, this.size/2, this.size, options);
        this.headingAngle = PI;
        Composite.add(world, [this.body]);
        this.angle = this.tool.angle;
    }
    getInput(){
        let dir = createVector(0,0);
        if (keyIsDown(W))
            dir.add(createVector(0,-1));
        if (keyIsDown(A))
            dir.add(createVector(-1,0));
        if (keyIsDown(S))
            dir.add(createVector(0,1));
        if (keyIsDown(D))
            dir.add(createVector(1,0));
        this.direction = dir;
    };
    update(){
        this.getInput();
        this.position.add(this.direction.mult(this.speed));
        Matter.Body.setAngle(this.body, PI);
        Matter.Body.setPosition(this.body, {x: this.position.x, y:this.position.y});
        this.tool.updatePosition(this.position.x + 10, this.position.y)
    };
    draw = () => {
        const position = this.body.position;
        const heading = createVector(this.direction.x, this.direction.y);
        if(heading.mag() > 0.1){
            this.headingAngle = heading.heading() + TWO_PI;
        }
        push();
        translate(position.x, position.y);
        const img = shepherdSprite.getImg(this.headingAngle, this.size*2);
        image(img, -this.size, -this.size);
        pop();
        this.tool.draw();
    }
}

class Crook{
    constructor(x, y,  world){
        this.size = 70;
        const options = {
            friction: 10,
        };
        this.body = Bodies.rectangle(x, y, this.size, this.size/2, options);
        Composite.add(world, [this.body]);
        this.angle = atan2(mouseY - x, mouseX - y);
        this.image = shepherdCrystal;
        this.image.resize(this.size, 0);
    }
    updatePosition(playerX, playerY){
        this.angle = atan2(mouseY - playerY, mouseX - playerX);
        let radius = 80;
        let x = playerX + radius * cos(this.angle);
        let y = playerY + radius * sin(this.angle);
        this.position = {x: x, y: y};
        Matter.Body.setPosition(this.body, this.position, true);// this.position;
        Matter.Body.setAngle(this.body, this.angle); 
        Matter.Body.setSpeed(this.body, this.body.speed/2)
    }
    draw = () => {
        const angle = this.body.angle;
        push();
        translate(this.position.x, this.position.y);
        rotate(angle+HALF_PI);
        image(this.image, -this.size/2, -this.size/2)
        pop();
    }
}
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
        let newPosition = p5.Vector.mult(this.direction, this.speed)
        this.position.add(this.direction.mult(this.speed));
        this.tool.updatePosition(this.position.x + 10, this.position.y)
    };
    draw = () => {
        push();
        line(this.position.x,this.position.y, this.tool.position.x, this.tool.position.y);
        translate(this.position.x, this.position.y);
        stroke(2);
        rect(0, 0, this.size/2, this.size);
        pop();
        this.tool.draw();
    }
}

class Crook{
    constructor(x, y,  world){
        this.size = 50;
        const options = {
            friction: 10,
        };
        this.body = Bodies.rectangle(x, y, this.size, this.size/2, options);
        Composite.add(world, [this.body]);
    }
    updatePosition(playerX, playerY){
        this.theta = atan2(mouseY - playerY, mouseX - playerX);
        let radius = 60;
        let x = playerX + radius * cos(this.theta);
        let y = playerY + radius * sin(this.theta);
        this.position = {x: x, y: y};
        Matter.Body.setPosition(this.body, this.position, true);// this.position;
        Matter.Body.setAngle(this.body, this.theta); 
        Matter.Body.setSpeed(this.body, this.body.speed/2)
    }
    draw = () => {
        const angle = this.body.angle;
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        stroke(2);
        rect(0, 0, this.size, this.size/2);
        pop();
    }
}
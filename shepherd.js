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
        // const options = {
        //     friction: 0,
        // };
        // this.body = Bodies.rectangle(x, y, this.size, this.size, options);
        // Composite.add(world, [this.body]);
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
        const position = this.position;
        // const angle = this.body.angle;
        // this.body.position = {x: position.x, y: position.y};
        push();
        translate(this.position.x, this.position.y);
        stroke(2);
        rect(0, 0, this.size);
        line(0, 0, 20, 0)
        pop();
        this.tool.draw();
    }
}

class Crook{
    constructor(x, y, world){
        this.position = createVector(x, y);
        this.size = 50;
        const options = {
            friction: 0,
        };
        this.body = Bodies.rectangle(x, y, this.size, this.size/2, options);
        Composite.add(world, [this.body]);
    }
    updatePosition(playerX, playerY){
        // let x = playerX + 100 * cos(mouseY);
        // let y = playerY + 100 * sin(mouseY);

        let theta = atan2(mouseY - playerY, mouseX - playerX);
        let radius = 60;
        let x = playerX + radius * cos(theta);
        let y = playerY + radius * sin(theta);

    this.position = {x: x, y: y};
    }
    draw = () => {
        const position = this.position;
        const angle = this.body.angle;
        this.body.position = {x: position.x, y: position.y};
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        stroke(2);
        rect(0, 0, this.size, this.size/2);
        line(0, 0, 20, 0)
        pop();
    }
}
class Sheep {
    constructor(x, y, world) {
        const options = {
            friction: 0,
        };
        this.body = Bodies.circle(x, y, 20, options);
        Composite.add(world, [this.body]);

    }

    draw = () => {
        const position = this.body.position;
        const angle = this.body.angle;
        push();
        translate(position.x, position.y)
        rotate(angle);
        stroke(2);
        ellipse(0, 0, 40);
        line(0, 0, 20, 0)
        pop();
    }
}
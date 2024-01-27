class Sheep {
    constructor(x, y, world) {
        //matter-js
        const options = {
            friction: 0,
        };

        this.r = 20; // collision body radius
        this.body = Bodies.circle(x, y, this.r, options);
        Composite.add(world, [this.body]);
        //autonomous
        this.position = createVector(this.body.position.x, this.body.position.y)
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.maxspeed = 3; // Maximum speed
        this.maxforce = 0.05; // Maximum steering force

    }


    run = (herd) => {
        const attraction = this.cohere(herd);
        attraction.mult(0.02);
        this.body.force.x+=attraction.x;
        this.body.force.y+=attraction.y;

        //this.update();
        this.draw();

    }
    applyForce = (force) => {
        this.acceleration.add(force);
    }
    cohere = (herd) => {
        let neighborDistance = 300;
        let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
        let count = 0;
        const position = createVector(this.body.position.x,this.body.position.y);
        for (let i = 0; i < herd.length; i++) {
            const otherPosition = createVector(herd[i].body.position.x,herd[i].body.position.y)
            let d = p5.Vector.dist(position, otherPosition);
            if (d > 0 && d < neighborDistance) {
                sum.add(herd[i].position); // Add location
                count++;

            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum); // Steer towards the location
        } else {
            return createVector(0, 0);
        }
    }

    seek = (target) => {
        let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(0.001);;
        return desired;
        // Steering = Desired minus Velocity
        
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
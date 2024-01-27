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
        [this.position.x, this.position.y] = [this.body.position.x, this.body.position.y]
        const steering = this.cohere(herd);
        steering.mult(1.0);
        this.applyForce(steering);
        this.update();
        this.draw();

    }
    applyForce = (force) => {
        this.acceleration.add(force);
    }
    cohere = (herd) => {
        let neighborDistance = 100;
        let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
        let count = 0;
        for (let i = 0; i < herd.length; i++) {
            let d = p5.Vector.dist(this.position, herd[i].position);
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
        desired.mult(this.maxspeed);
        // Steering = Desired minus Velocity
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce); // Limit to maximum steering force
        return steer;
    }

    update = () => {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        //reset acceleration
        this.acceleration.mult(0);
        //update physics body
        this.body.position = {
            x: this.position.x,
            y: this.position.y
        }
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
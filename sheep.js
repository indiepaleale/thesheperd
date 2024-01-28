class Sheep {
    constructor(x, y, world) {
        //matter-js
        const options = {
            friction: 1,
        };

        this.r = 12; // collision body radius
        this.size = 40; // sprite size w&h
        this.body = Bodies.circle(x, y, this.r, options);
        Composite.add(world, [this.body]);
        //autonomous
        this.position = createVector(this.body.position.x, this.body.position.y)

    }


    run = (herd) => {
        const attraction = this.cohere(herd);
        attraction.mult(0.02);
        Matter.Body.applyForce(this.body, this.body.position, {
            x: attraction.x,
            y: attraction.y,
        })
        this.draw();

    }

    cohere = (herd) => {
        let neighborDistance = 300;
        let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
        let count = 0;
        const position = createVector(this.body.position.x, this.body.position.y);
        for (let i = 0; i < herd.length; i++) {
            const otherPosition = createVector(herd[i].body.position.x, herd[i].body.position.y)
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
    }

    draw = () => {
        const position = this.body.position;
        const velocity = Matter.Body.getVelocity(this.body);
        const heading = createVector(velocity.x,velocity.y)
        const angle = heading.heading() + TWO_PI;

        push();
        translate(position.x - this.size/2, position.y - this.size/2);
        const img = sheepSprite.getImg(angle,this.size)
        image(img,0,0);
        pop();
    }
}
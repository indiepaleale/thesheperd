class Sheep {
    constructor(x, y, world) {
        //matter-js
        const options = {
            friction: 1,
        };

        this.r = 20; // collision body radius
        this.body = Bodies.circle(x, y, this.r, options);
        Composite.add(world, [this.body]);
        //autonomous
        this.position = createVector(this.body.position.x, this.body.position.y)

    }


    run = (herd) => {
        const attraction = this.cohere(herd);
        attraction.mult(0.02);
        Matter.Body.applyForce(this.body,this.body.position,{
            x:attraction.x,
            y:attraction.y,
        })
        this.draw();

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
        desired.mult(0.01);;
        return desired;        
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
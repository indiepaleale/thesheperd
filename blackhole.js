class Blackhole {
    constructor(x, y, r,sprite) {
        this.position = createVector(x, y);
        this.radius = r;
        this.rangeFactor = 2;
        this.forceFactor = 0.0001;
        this.sprite = sprite;
    }

    show = () => {
        let img = this.sprite.animated();
        img.resize(400,400)
        push();
        translate(this.position.x - img.width/2, this.position.y- img.height/2);
        image(img,0,0)
        pop();
    }

    inBound = (herd) => {
        herd.forEach((sheep, index) => {
            const sheepPosition = createVector(sheep.body.position.x, sheep.body.position.y);
            const distance = p5.Vector.dist(sheepPosition, this.position);
            if (distance < this.rangeFactor * this.radius) {
                let direction = p5.Vector.sub(this.position, sheepPosition);
                direction.setMag(this.forceFactor)
                Matter.Body.applyForce(sheep.body, sheep.body.position, {
                    x: direction.x,
                    y: direction.y
                })

                if (distance < this.radius) {
                    sheep.inBlackHole();
                }
                if (distance < 50) {
                    World.remove(world,sheep.body);
                    herd.splice(index, 1);
                    
                }
            }
        })
    }
    
}
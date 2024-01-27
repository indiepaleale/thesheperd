class Boundary {
    constructor(width, height) {
        this.ply = 50;
        const options = {
            friction: 1,
            isStatic: true
        }
        Composite.add(world, [
            // walls
            Bodies.rectangle(width / 2, 0, width, this.ply, options),
            Bodies.rectangle(width / 2, height, width, this.ply, options),
            Bodies.rectangle(width, height/2, this.ply, height, options),
            Bodies.rectangle(0, height/2, this.ply, height, options)
        ]);
    }
}
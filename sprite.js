class Sprite {
    constructor(spriteSheet, spriteData) {
        this.frames = [];
        let frames = spriteData.frames;

        for (let i = 0; i < frames.length; i++) {
            let pos = frames[i].position;
            let img = spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
            this.frames.push(img);
        }
        this.animationIndex = 0;
    }

    getImg = (angle, size) => {
        angle += 1.178097225;
        let index = angle / QUARTER_PI;
        index = floor((index + 1) % 8)
        let img = this.frames[index];
        img.resize(size, size);
        return img;
    }

    animated = ()=>{
        return this.frames[(this.animationIndex++)%this.frames.length];
    }

}
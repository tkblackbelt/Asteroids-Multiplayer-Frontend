import Entity from "../Entity";
import Particle from "./Particle";
import {numberBetween} from "../../../util/helpers";
import {NoPhysics} from "../../math/Physics";

class Explosion extends Entity {

    constructor(x: Number, y: Number, numberOfParticles, color) {
        super(x, y, NoPhysics());
        this.particles = this.generateParticles(numberOfParticles, color);
    }

    generateParticles(numberOfParticles, color) {
        const particles = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle(this.position.x,
                this.position.y, this.color, numberBetween(1, 360), numberBetween(10,30), 10));
        }
        return particles;
    }

    update(screenWidth: Number, screenHeight: Number) {
        super.update(screenWidth, screenHeight);
        this.particles.forEach(p => p.update(screenWidth, screenHeight));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        this.particles.forEach(p => p.draw(ctx));
    }
}

export function generateExplosion(x: Number, y: Number) {
    return new Explosion(x, y, numberBetween(5, 20))
}

export default Explosion;
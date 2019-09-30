import Entity from "../Entity";
import {getRandomColor, numberBetween} from "../../../util/helpers";
import {generateExplosion} from "./Explosion";
import {ConstantPhysics} from "../../math/Physics";

/**
 * Asteroid object
 */
class Asteroid extends Entity {

    constructor({x, y, angle, sides, size, velocity, rotationSpeed}) {
        super(x, y, ConstantPhysics(velocity, angle, rotationSpeed));
        this.sides = sides;
        this.radius = size;
        this.color = getRandomColor();
        this.explosion = null;
        this.exploding = false;
        this.exploded = false;
    }

    update(screenWidth: Number, screenHeight: Number) {
        super.update(screenWidth, screenHeight);


        if (this.exploding) {
            this.explosion.update(screenWidth, screenHeight);
        } else {
            this.angle += this.rotationSpeed;
            this.wrapPositionWithinBoundary(0, screenWidth, 0, screenHeight);
        }
    }

    explode(): void {
        this.explosion = generateExplosion(this.position.x, this.position.y);
        this.exploding = true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);

        if (this.exploding) {
            this.explosion.draw(ctx);

        } else {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 3;

            ctx.beginPath();

            for (let i = 1; i <= this.sides; i++) {
                ctx.lineTo(this.radius * Math.cos(i * 2 * Math.PI / this.sides),
                    this.radius * Math.sin(i * 2 * Math.PI / this.sides));
            }

            ctx.closePath();
            ctx.stroke();
        }
    }
}

/**
 * Generate a new Random Asteroid
 * @param maxX The maximum x position that it can be generated at
 * @param maxY the maximum y position that it can be generated at
 * @returns {Asteroid} new asteroid object
 */
export const generateAsteroid = (maxX, maxY) => {
    return new Asteroid({
            x: numberBetween(0, maxX),
            y: numberBetween(0, maxY),
            angle: numberBetween(0, 360),
            sides: 6,
            size: numberBetween(20, 80),
            velocity: numberBetween(1, 4),
            rotationSpeed: numberBetween(0, 0.1)
        }
    )
};

export const generateAsteroidField = (size, maxX, maxY) => {
    const asteroids = [];
    for (let i = 0; i < size; i++) {
        asteroids.push(generateAsteroid(maxX, maxY))
    }
    return asteroids;
};

export default Asteroid;
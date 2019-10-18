import Entity from "../Entity";
import {getRandomColor, numberBetween} from "../../../util/helpers";
import {generateExplosion} from "./Explosion";
import {ConstantPhysics} from "../../math/Physics";

/**
 * Asteroid object
 */
class Asteroid extends Entity {

    constructor({x, y, angle, sides, size, velocity, rotationSpeed, lives}) {
        super(x, y, ConstantPhysics(velocity, angle, rotationSpeed));
        this.sides = sides;
        this.radius = size;
        this.color = getRandomColor();
        this.explosion = null;
        this.exploding = false;
        this.lives = lives;
    }

    update(screenWidth: Number, screenHeight: Number) {
        super.update(screenWidth, screenHeight);

        if (this.isExploding()) {
            this.explosion.update(screenWidth, screenHeight);
        } else {
            this.wrapPositionWithinBoundary(0, screenWidth, 0, screenHeight);
        }
    }

    isExploding(): boolean {
        return this.exploding;
    }

    getLives(): number {
        return this.lives;
    }

    explodeIntoPieces(): [Asteroid] {
        this.explosion = generateExplosion(this.position.x, this.position.y);
        this.exploding = true;
        return this.generateChildAsteroids();
    }

    generateChildAsteroids(): [Asteroid] {
        const asteroids = [];
        for (let i = 0; i < numberBetween(0, this.lives); i++) {
            const asteroid = generateAsteroid(this.position.x, this.position.y);
            asteroid.position = this.position;
            asteroid.lives = this.lives - 1;
            asteroid.radius = this.radius / 2;

            asteroids.push(asteroid);
        }
        return asteroids;
    }

    shouldRemoveFromScreen(): boolean {
        return this.isExploding() && !this.explosion.hasParticles();
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
    let _maxX = maxX;
    let _minX = 0;
    let _maxY = maxY;
    let _minY = 0;

    const leftRight = numberBetween(1, 50);

    if (leftRight <= 25) {
        _maxX = (maxX / 2) - (maxX / 10)
    } else {
        _minX = (maxX / 2) + (maxX / 10)
    }

    const topBottom = numberBetween(1, 50);

    if (topBottom <= 25) {
        _maxY = (maxY / 2) - (maxY / 10)
    } else {
        _minY = (maxY / 2) + (maxY / 10)
    }

    return new Asteroid({
            x: numberBetween(_minX, _maxX),
            y: numberBetween(_minY, _maxY),
            angle: numberBetween(0, 360),
            sides: 6,
            size: numberBetween(20, 80),
            velocity: numberBetween(.5, 2),
            rotationSpeed: numberBetween(0, 0.1),
            lives: numberBetween(1, 4)
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
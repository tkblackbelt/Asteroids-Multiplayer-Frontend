import Drawable from "../Drawable";
import {buildStarFieldOfSize} from "./Star";

const CLEAR_SCREEN_COLOR = '#000';
const LINE_COLOR = 'rgba(147, 147, 147, .5)';

class Background extends Drawable {

    constructor(numberOfLines: Number, numberOfStars: Number) {
        super();
        this.numberOfLines = numberOfLines;
        this.gridSize = 0;
        this.stars = buildStarFieldOfSize(numberOfStars);
    }

    update(screenWidth: Number, screenHeight: Number): void {
        super.update(screenWidth, screenHeight);
        this.adjustGridSize();
        this.updateStars();
    }

    adjustGridSize(): Number {
        const smallestSize = this.screenWidth < this.screenHeight ? this.screenWidth : this.screenHeight;
        this.gridSize = smallestSize / this.numberOfLines;
    }

    updateStars(): void {
        this.stars.forEach(star => star.update(this.screenWidth, this.screenHeight));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        this.clearScreen(ctx);
        this.drawRows(ctx);
        this.drawColumns(ctx);
        this.drawStars(ctx);
    }

    clearScreen(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = CLEAR_SCREEN_COLOR;
        ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
    }

    drawRows(ctx: CanvasRenderingContext2D): void {
        for (let row = this.gridSize; row < this.screenHeight; row += this.gridSize) {
            ctx.moveTo(0, row);
            ctx.lineTo(this.screenWidth, row);
        }
        ctx.strokeStyle = LINE_COLOR;
        ctx.stroke();
    }

    drawColumns(ctx: CanvasRenderingContext2D): void {
        for (let col = this.gridSize; col < this.screenWidth; col += this.gridSize) {
            ctx.moveTo(col, 0);
            ctx.lineTo(col, this.screenHeight);
        }
        ctx.strokeStyle = LINE_COLOR;
        ctx.stroke();
    }

    drawStars(ctx: CanvasRenderingContext2D): void {
        this.stars.forEach(star => star.draw(ctx));
    }
}

export default Background;
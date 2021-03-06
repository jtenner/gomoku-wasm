import "allocator/tlsf";
import {PlayerRole} from "../game/GameEngine";
import {engine, GameGUI} from "../game/GameGUI";
import {console} from "../game/console";
import {Chess, constants} from "./constants";


const Black: string = "#111"
const White: string = "#EEE"
let EmptyState: Int8Array = new Int8Array(0)

function chessOfColor(chess: Chess): string {
    if (chess == Chess.Black) {
        return Black
    } else if (chess == Chess.White) {
        return White
    } else {
        return "none"
    }
}

class Config {
    chessBoardColor: string = "yellow"
    gridSize: i32 = 30
    canvasWidth: i32 = 450//this.gridSize * 15
    canvasHeight: i32 = 450//this.gridSize * 15
    gridColor: string = '#000'
    chessSize: i32 = 12
    pointColor: string = "#f00" //TODO
    dimension: i32 = constants.boardDimension
}

class GomokuGUI extends GameGUI {

    cfg: Config;

    constructor() {
        super();
        this.cfg = new Config();
    }

    update(player: PlayerRole, state: Int8Array): boolean {
        if (engine.update(player, state)) {
            this.updateGUI(player, state);
            return true
        }
        return false
    }

    updateGUI(player: PlayerRole, state: Int8Array): void {
        this.drawChess(state[0], state[1], constants.chessOfPlayer(player))
    }

    draw(): void {
        let i: i32;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = this.cfg.chessBoardColor;
        this.ctx.fillRect(0, 0, this.cfg.canvasWidth, this.cfg.canvasHeight);
        for (i = 0; i < this.cfg.dimension; i++) {
            this.ctx.moveTo(this.cfg.gridSize / 2, this.cfg.gridSize / 2 + this.cfg.gridSize * i);
            this.ctx.lineTo(this.cfg.gridSize * (this.cfg.dimension) - this.cfg.gridSize / 2, this.cfg.gridSize / 2 + this.cfg.gridSize * i);
        }
        for (i = 0; i < this.cfg.dimension; i++) {
            this.ctx.moveTo(this.cfg.gridSize / 2 + this.cfg.gridSize * i, this.cfg.gridSize / 2);
            this.ctx.lineTo(this.cfg.gridSize / 2 + this.cfg.gridSize * i, (this.cfg.dimension) * this.cfg.gridSize - this.cfg.gridSize / 2);
        }
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = this.cfg.gridColor;
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx.commit();
    }

    onClick(x: i32, y: i32): Int8Array {
        let row = i8(Math.round(x / this.cfg.gridSize));
        let col = i8(Math.round(y / this.cfg.gridSize));
        let state = new Int8Array(2);
        state[0] = row;
        state[1] = col;
        console.logAction("onClick", this.player, state);
        if (engine.update(this.player, state)) {
            this.drawChess(row, col, constants.chessOfPlayer(this.player))
            return state
        }
        return EmptyState
    }

    drawChess(row: i32, col: i32, chess: Chess): void {
        if (chess == Chess.None) {
            return
        }
        let color = chessOfColor(chess)
        console.log("drawChess:" + color)
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.cfg.gridSize * (row) + this.cfg.gridSize / 2, this.cfg.gridSize * (col) + this.cfg.gridSize / 2, this.cfg.chessSize, 0, Math.PI * 2, true);
        this.ctx.fillStyle = color
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.commit();
    }
}

export {GomokuGUI}
import {CanvasRenderingContext2D} from "../../node_modules/as2d/assembly/index";
import {PlayerRole} from "./GameEngine";
import {console} from "./console";

export declare namespace engine {

    @external("engine", "update")
    function update(player: PlayerRole, state: Int8Array): boolean;

    @external("engine", "loadState")
    function loadState(fullState: Int8Array): void;

    @external("engine", "getState")
    function getState(): Int8Array;

    @external("engine", "isGameOver")
    function isGameOver(): boolean;

    @external("engine", "getWinner")
    function getWinner(): PlayerRole;

}

export abstract class GameGUI {

    player: PlayerRole;
    ctx: CanvasRenderingContext2D;

    init(ctx: CanvasRenderingContext2D, player: PlayerRole): void {
        console.log("GameGUI init");
        this.ctx = ctx;
        this.player = player;
    }

    draw(): void {
    }

    update(player: PlayerRole, state: Int8Array): boolean {
        return false
    }


    loadState(fullState: Int8Array): void {
        engine.loadState(fullState)
        this.draw()
    }

    getState(): Int8Array {
        return engine.getState()
    }

    isGameOver(): boolean {
        return engine.isGameOver()
    }

    getWinner(): PlayerRole {
        return engine.getWinner()
    }
}
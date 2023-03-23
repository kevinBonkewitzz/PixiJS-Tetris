import { Application, Sprite } from 'pixi.js'

const appWidth = 256;
const appHeight = 512;
const unit = 32;

let app = new Application({ width: appWidth, height: appHeight });

let Game = {
    inactiveTetroninos: []
}

let ActiveTetromino = {
    state: 1,
    stepsHorizontal: 0,
    stepsVertical: 0,
    tetromino: null
};

export { app, appWidth, appHeight, unit, Game, ActiveTetromino }
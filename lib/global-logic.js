import { Sprite } from 'pixi.js'
import { ActiveTetromino } from "./global-state";
import { lShape } from "./patterns";
import { unit } from "./global-state";
import Tetromino from '../models/Tetromino';
import { app } from './global-state';
import Direction from '../enums/directions';
import { Game } from './global-state';

// Spawn
function respawn() {
    // Ensure defaults are set
    ActiveTetromino.stepsHorizontal = 0;
    ActiveTetromino.stepsVertical = 0;

    // Generate 4 blocks in a pattern (the 'Tetromino')
    // Generate a 'L' shape by default
    ActiveTetromino.state = 1;
    const pattern = lShape[0].template;

    let blocks = [];
    pattern.forEach(coordinates => {
        const coords = { x: coordinates[0], y: coordinates[1] }
        let newSprite = generateSprite((coords.x - 1) * unit, (coords.y - 1) * unit);
        blocks.push(newSprite);
    });

    ActiveTetromino.tetromino = new Tetromino(blocks);
    console.log('Respawn', ActiveTetromino)

    // Attach every sprite to the stage
    ActiveTetromino.tetromino.blocks.forEach(sprite => {
        app.stage.addChild(sprite);
    });
}

// When the player has reached the end of the stage
function terminated() {
    Game.inactiveTetroninos = Game.inactiveTetroninos.concat(ActiveTetromino.tetromino.blocks);
    ActiveTetromino.tetromino = null;
    respawn();
}


function generateSprite(x = 0, y = 0) {
    var currentSprite = Sprite.from('assets/Box.png');
    currentSprite.width = 32;
    currentSprite.height = 32;

    currentSprite.x = x;
    currentSprite.y = y;

    return currentSprite;
}

function moveCluster(tetromino, direction) {
    if (direction == Direction.Left || direction == Direction.Right)
        for (let i = 0; i < tetromino.blocks.length; i++) {
            tetromino.blocks[i].x += (direction == Direction.Right ? 32 : -32);
        }
    else if (direction == Direction.Down)
        for (let i = 0; i < tetromino.blocks.length; i++) {
            tetromino.blocks[i].y += 32;
        }
    else if (direction == Direction.Up)
        for (let i = 0; i < tetromino.blocks.length; i++) {
            tetromino.blocks[i].y -= 32;
        }
}


export { respawn, terminated, moveCluster }
import { Sprite } from 'pixi.js'
import { ActiveTetromino, appHeight, appWidth } from "./global-state";
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
    // Convert the active block to inactive blocks
    Game.inactiveTetroninos = Game.inactiveTetroninos.concat(ActiveTetromino.tetromino.blocks);
    // Empty out the player's tetromino logic 
    ActiveTetromino.tetromino = null;

    // Loop x from 0 to the max with

    // Start from the bottom
    for (let y = appHeight; y > 0; y -= unit) {
        let matchingIndexes = 0;
        let maxIndexes = appWidth / unit;

        for (let x = 0; x < appWidth; x += unit) {
            if(Game.inactiveTetroninos.filter(f => f.x == x && f.y == y).length > 0) {
                matchingIndexes += 1;
            }
        }

        if(matchingIndexes == maxIndexes) {
            var filtered = Game.inactiveTetroninos.filter(function(value, index, arr){ 
                return value.y == y;
            });
            var remaining = Game.inactiveTetroninos.filter(function(value, index, arr){ 
                return value.y != y;
            });

            Game.inactiveTetroninos = remaining;
            filtered.forEach(sprite => {
                app.stage.removeChild(sprite);
            });
            console.log('Remove', filtered)

            console.log('Remove line')
        }
    }

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
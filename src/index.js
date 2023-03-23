import { Application, Sprite } from 'pixi.js'
import Direction from '../enums/directions'
import getCoordinates from '../lib/rotate';
import updateDirection from '../lib/updateDirection';
import { lShape } from '../lib/patterns';

const appWidth = 256;
const appHeight = 512;

const unit = 32;

// Create the application helper and add its render target to the page
let app = new Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);

function generateSprite(x = 0, y = 0) {
    var currentSprite = Sprite.from('assets/Box.png');
    currentSprite.width = 32;
    currentSprite.height = 32;

    currentSprite.x = x;
    currentSprite.y = y;

    return currentSprite;
}

class Tetromino {
    constructor(blocks) {
        // [] Each block is a sprite, which has x and y propeties
        this.blocks = blocks;
    }
}

// Create the sprite and add it to the stage
let ActiveTetromino = {
    state: 1,
    stepsHorizontal: 0,
    stepsVertical: 0,
    tetromino: null
};

let Game = {
    inactiveTetroninos: []
}

// Compose a cluster of sprite blocks
function Start() {
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

Start();

// Move left and right
window.addEventListener("keydown", keydown)

function keydown(e) {
    if (e.key == 'ArrowRight') {
        ActiveTetromino.stepsHorizontal += 1;
        MoveCluster(ActiveTetromino.tetromino, Direction.Right);

        // Prevent player moving out of bounds
        HandlePlayFieldCollission(Direction.Right, ActiveTetromino);
    }
    else if (e.key == 'ArrowLeft') {
        ActiveTetromino.stepsHorizontal -= 1;
        MoveCluster(ActiveTetromino.tetromino, Direction.Left);

        // Prevent player moving out of bounds
        HandlePlayFieldCollission(Direction.Left, ActiveTetromino);
    }
    else if (e.key == 'ArrowUp') {
        ActiveTetromino.state += 1;
        if (ActiveTetromino.state == 5)
            ActiveTetromino.state = 1;

        // Loop through every block in the tetromino
        for (let index = 0; index < ActiveTetromino.tetromino.blocks.length; index++) {

            const block = ActiveTetromino.tetromino.blocks[index];
            const newPattern = lShape[ActiveTetromino.state - 1].template;

            block.x = (ActiveTetromino.stepsHorizontal * unit) + (newPattern[index][0] - 1) * unit;
            block.y = (ActiveTetromino.stepsVertical * unit) + (newPattern[index][1] - 1) * unit;
        }

        // Prevent player moving out of bounds
        HandlePlayFieldCollission(Direction.Down, ActiveTetromino);
    }
    else if (e.key == 'ArrowDown') {
        ActiveTetromino.stepsVertical += 1;
        MoveCluster(ActiveTetromino.tetromino, Direction.Down);

        // Prevent player moving out of bounds
        HandlePlayFieldCollission(Direction.Down, ActiveTetromino);
    }
}
function MoveCluster(tetromino, direction) {
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

function Terminated() {
    Game.inactiveTetroninos = Game.inactiveTetroninos.concat(ActiveTetromino.tetromino.blocks);
    ActiveTetromino.tetromino = null;

    Start();
}

function HandlePlayFieldCollission(movementDirection, activeTetromino) {
    const checkCollission = CheckPlayFieldCollission(movementDirection, activeTetromino.tetromino.blocks);

    if (checkCollission != null) {
        if (checkCollission == Direction.Right) {
            MoveCluster(activeTetromino.tetromino, Direction.Left);
            activeTetromino.stepsHorizontal -= 1;
        }
        else if (checkCollission == Direction.Left) {
            MoveCluster(activeTetromino.tetromino, Direction.Right);
            activeTetromino.stepsHorizontal += 1;
        }
        else if (checkCollission == Direction.Down) {
            MoveCluster(activeTetromino.tetromino, Direction.Up);
            activeTetromino.stepsVertical -= 1;

            Terminated();
        }
    }
}

// Check whether the cluster collides with the playing field's border
// Returns true if a collision was detected
function CheckPlayFieldCollission(movementDirection, sprites) {
    let resultCollission = null;

    // [Start] - Check Horizontal collission
    for (let i = 0; i < sprites.length; i++) {
        if (sprites[i].x == (appWidth)) {
            // console.log('Reached the end')
            resultCollission = Direction.Right;
        }
        else if (sprites[i].x == 0 - sprites[i].width) {
            // console.log('Reached the start')
            resultCollission = Direction.Left;
        }

        // [Start] - Check Vertical collission
        else if (sprites[i].y == (appHeight)) {
            resultCollission = Direction.Down;
        }
        // Check if any inactive blocks intersect
        else {
            const interectingBlocks = Game.inactiveTetroninos.filter(f => f.x == sprites[i].x && f.y == sprites[i].y)
            // If a block intersected somewhere- we need to identify whether it occurred to the left, right or below
            if (interectingBlocks.length > 0) {
                const interectingBlock = interectingBlocks[0];

                if (movementDirection == Direction.Left) {
                    resultCollission = Direction.Left;
                }
                else if (movementDirection == Direction.Right) {
                    resultCollission = Direction.Right;
                }
                else
                    resultCollission = Direction.Down;
            }
        }
        // [End] - Check Vertical collission
    }
    // [End] - Check Horizontal collission
    return resultCollission;
}
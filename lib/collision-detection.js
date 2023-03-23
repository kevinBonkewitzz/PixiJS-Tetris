import Direction from '.././enums/directions'
import { appWidth, appHeight, unit, Game } from './global-state';
import { terminated, moveCluster } from './global-logic';

// This method resolves what action to take depending on the direction of the collision
function handlePlayFieldCollision(movementDirection, activeTetromino) {
    const collisionDirection = checkPlayFieldCollision(movementDirection, activeTetromino.tetromino.blocks);

    if (collisionDirection === Direction.Right) {
        moveCluster(activeTetromino.tetromino, Direction.Left);
        activeTetromino.stepsHorizontal -= 1;
    } else if (collisionDirection === Direction.Left) {
        moveCluster(activeTetromino.tetromino, Direction.Right);
        activeTetromino.stepsHorizontal += 1;
    } else if (collisionDirection === Direction.Down) {
        moveCluster(activeTetromino.tetromino, Direction.Up);
        activeTetromino.stepsVertical -= 1;
        terminated();
    }
}

// Check whether the cluster collides with the playing field's border
// Returns the direction of the collision if one was detected, or null if there was no collision
// This method resolves the DIRECTION that the collision occurred
function checkPlayFieldCollision(movementDirection, sprites) {
    for (let i = 0; i < sprites.length; i++) {
        if (sprites[i].x === appWidth) {
            return Direction.Right;
        } else if (sprites[i].x === 0 - sprites[i].width) {
            return Direction.Left;
        } else if (sprites[i].y === appHeight) {
            return Direction.Down;
        } else {
            // If a block intersected somewhere- we need to identify whether it occurred to the left, right or below
            const intersectingBlocks = Game.inactiveTetroninos.filter(block => block.x === sprites[i].x && block.y === sprites[i].y);
            if (intersectingBlocks.length > 0) {
                if (movementDirection === Direction.Left) {
                    return Direction.Left;
                } else if (movementDirection === Direction.Right) {
                    return Direction.Right;
                } else {
                    return Direction.Down;
                }
            }
        }
    }
    return null;
}

export {checkPlayFieldCollision, handlePlayFieldCollision} ;
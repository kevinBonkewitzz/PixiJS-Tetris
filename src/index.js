import Direction from '../enums/directions'
import { lShape } from '../lib/patterns';
import { moveCluster, respawn } from '../lib/global-logic';
import { app, unit, ActiveTetromino } from '../lib/global-state';
import { handlePlayFieldCollision } from '../lib/collision-detection';

// Create the application helper and add its render target to the page
document.body.appendChild(app.view);

// Move left and right
window.addEventListener("keydown", keydown)

function keydown(e) {
    if (e.key == 'ArrowRight') {
        ActiveTetromino.stepsHorizontal += 1;
        moveCluster(ActiveTetromino.tetromino, Direction.Right);

        // Prevent player moving out of bounds
        handlePlayFieldCollision(Direction.Right, ActiveTetromino);
    }
    else if (e.key == 'ArrowLeft') {
        ActiveTetromino.stepsHorizontal -= 1;
        moveCluster(ActiveTetromino.tetromino, Direction.Left);

        // Prevent player moving out of bounds
        handlePlayFieldCollision(Direction.Left, ActiveTetromino);
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
        handlePlayFieldCollision(Direction.Down, ActiveTetromino);
    }
    else if (e.key == 'ArrowDown') {
        ActiveTetromino.stepsVertical += 1;
        moveCluster(ActiveTetromino.tetromino, Direction.Down);

        // Prevent player moving out of bounds
        handlePlayFieldCollision(Direction.Down, ActiveTetromino);
    }
}
respawn();
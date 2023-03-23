import Direction from "../enums/directions";

// function getCoordinates(
//     originX,
//     originY,
//     myX,
//     myY,
//     direction) {
//     let newX = null;
//     let newY = null;

//     switch (direction) {
//         case (Direction.Up):
//             newX = originX;
//             newY = (originY - myY) * 2;
//             // console.log(newX, newY)
//             break;
//         case (Direction.Right):
//             newX = originX + (myY + originY);
//             newY = originY;
//             console.log('Right')
//             console.log(newX, newY)
//             break;
//         case (Direction.Down):
//             newX = originX;
//             newY = myX - originX + originY;
//             // console.log(newX, newY)
//             break;
//         case (Direction.Left):
//             newX = originX - (myY - originY);
//             newY = originY;
//             // console.log(newX, newY)
//             break;
//     }

//     return [newX, newY];
// }

function getCoordinates(
    originSprite,
    spriteBlockIndex,
    spriteBlock,
    direction) {
    // Organize the coords in a more readable way
    const origin = { x: originSprite.x, y: originSprite.y };
    const currentPosition = { x: spriteBlock.x, y: spriteBlock.y };
    const newPosition = { x: null, y: null };

    console.log('New Direction', direction)


    switch (direction) {
        case (Direction.Right):

            switch (spriteBlockIndex) {
                case (1):
                    break;
                case (2):
                    break;
                case (3):
                    break;
            }

            newX = originX + (myY + originY);
            newY = originY;

            console.log(newX, newY)
            break;
        case (Direction.Down):
            newX = originX;
            newY = myX - originX + originY;
            // console.log(newX, newY)
            break;
        case (Direction.Left):
            newX = originX - (myY - originY);
            newY = originY;
            // console.log(newX, newY)
            break;
        case (Direction.Up):
            newX = originX;
            newY = (originY - myY) * 2;
            // console.log(newX, newY)
            break;
    }



    let newX = null;
    let newY = null;

    switch (direction) {
        case (Direction.Up):
            newX = originX;
            newY = (originY - myY) * 2;
            // console.log(newX, newY)
            break;
        case (Direction.Right):
            newX = originX + (myY + originY);
            newY = originY;
            console.log('Right')
            console.log(newX, newY)
            break;
        case (Direction.Down):
            newX = originX;
            newY = myX - originX + originY;
            // console.log(newX, newY)
            break;
        case (Direction.Left):
            newX = originX - (myY - originY);
            newY = originY;
            // console.log(newX, newY)
            break;
    }

    return [newX, newY];
}

export default getCoordinates;
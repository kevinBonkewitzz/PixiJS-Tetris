import Direction from "../enums/directions";

function updateDirection(direction) {
    if (direction == Direction.Up)
            direction = Direction.Right;
        else if (direction == Direction.Right)
            direction = Direction.Down;
        else if (direction == Direction.Down)
            direction = Direction.Left;
        else if (direction == Direction.Left)
            direction = Direction.Up;

    return direction;
}

export default updateDirection;
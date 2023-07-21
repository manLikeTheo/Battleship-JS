import { randomCoords, Ship_Types } from "./helper_functions";

const Gameboard = () => {
    //a board of 10 * 10 dimension, Row-Col
    let board = Array(10).fill(null).map(() => Array(10).fill(null));

    const getBoard = () => board;

    let shipsPlacedOnBoard = [];

    const checkIfAllShipsPlaced = () => shipsPlacedOnBoard.length === Ship_Types.length;

    const adjustCoordinates = (y0, x0, i, direction) => {
        //default - horizontal
        let x  = x0 + i;
        let y = y0;

        if(direction === "vertical") {
            x = x0;
            y = y0 + i;
        }
        return [y, x];
    };

    //place ship
    const placeShip = (ship, y0, x0) => {
        const direction = ship.getDirection();
        //check if out of boundary / collide
        const validPlacement = checkValid(ship.length, direction, y0, x0);
        if(validPlacement) {
            for(let i = 0; i < ship.length; i++) {
                const [y, x] = adjustCoordinates(y0, x0, i, direction);
                //place with index
                board[y][x] = { ship, index: i };
            }
            //add to ships placed on board
            shipsPlacedOnBoard.push(ship);
            return validPlacement;
        } else {
            return validPlacement;
        }
    };

    const checkValid = (length, direction, y0, x0) => {
        const cells = [];
        for(let i = 0; i < length; i++) {
            const [y, x] = adjustCoordinates(y0, x0, i, direction);
            //make sure y and x are within boundary
            if(y < 10 && x < 10) {
                cells.push(board[y][x]);
            } else {
                return false;
            }
        }
        return cells.every( (cell) => cell === null);
    };

    const autoPlaceShip = (ship) => {
        const [y, x] = randomCoords();
        const changedOrientation = Math.random() > 0.5;
        if(changedOrientation) ship.changeDiretion();

        const placed = placeShip(ship, y, x);
        if(!placed) autoPlaceShip(ship);
    };

    const autoPlaceFleet = (fleet) => {
        for(const ship in fleet) {
            autoPlaceShip(fleet[ship]);
        }
    };

    const receiveAttack = (y, x) => {
        //know whether the attack hit the ship or not
        if(board[y][x] === null) {
            //record missed shot
            board[y][x] = "miss";
        } else if (board[y][x].ship) {
            //activates "hit" function of the right ship
            board[y][x].ship.hit(board[y][x].index);
            //record the attacked squaer with "hit" (prevents hitting twice)
            board[y][x] = "hit";
        }
        return board[y][x];
    };

    const areShipsSunk = () => shipsPlacedOnBoard.every((ship) => ship.isSunk());

    const reset = () => {
        board = Array(10).fill(null).map(() => Array(10).fill(null));
        shipsPlacedOnBoard = [];
    };

    return { 
        getBoard,
        placeShip,
        areShipsSunk,
        receiveAttack,
        checkIfAllShipsPlaced,
        autoPlaceFleet,
        reset
    };
};

export default Gameboard;
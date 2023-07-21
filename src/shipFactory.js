import { Ship_Lengths } from "./helper_functions";

const Ship = (type) => {
    const id = type;
    const length = Ship_Lengths[type];
    let direction = "horizontal";

    const getDirection = () => direction;
    const changeDirection = () => {
        direction === "horizontal" ? (direction = "vertical") : (direction = "horizontal");
    };

    //Attack
    const hits  = Array(length).fill(null);
    const hit = (i) => (hits[i] = "hit");
    const getHits = () => hits;

    //Check if ship is sunk
    const isSunk = () => hits.every(h => h === "hit");

    return {
        id,
        length,
        hit,
        getHits,
        isSunk,
        getDirection,
        changeDirection
    }
};

export default Ship;
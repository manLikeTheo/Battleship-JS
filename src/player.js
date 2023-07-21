import { Ship_Types, randomCoords, createFleet } from "./helper_functions";

const Player = (type = "human") => {
    let fleet = createFleet(Ship_Types);

    const getType = () => type;
    const getFleet = () => fleet;

    //Shoot enemy board at coordinates [y][x];
    const attack = (y, x, enemyBoard) => enemyBoard.receiveAttack(y, x);

    const autoAttack = (enemyBoard) => {
        const [y, x] = randomCoords();
        const cell = enemyBoard.getBoard()[y][x];

        if(cell === "miss" || cell === "hit") {
            //repeat until a valid cell is picked
            autoAttack(enemyBoard);
        } else {
            //attack a valid cell
            enemyBoard.receiveAttack(y, x);
        }
    };

    const resetFleet = () => (fleet = createFleet(Ship_Types));

    return {
        getType,
        getFleet,
        attack,
        autoAttack,
        resetFleet
    };

} ;

export default Player;
import Ship from "./shipFactory";

export const Ship_Types = [
    "carrier",
    "battleship",
    "cruiser",
    "submarine",
    "destroyer",
];

export const Ship_Length = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
};

// Functions
const random = (size = 10) => Math.floor(Math.random() * size);

export const randomCoords = (size = 10) => [random(size), random(size)];

export const createFleet = (types) => {
    //Will create an object of Ships
    const fleet = {};
    types.forEach(type => fleet[type] = Ship(type));
    return fleet;
}

// console.log(createFleet());
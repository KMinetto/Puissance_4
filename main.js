let puissance4;

const nbColumn = 7, nbLine = 6;

puissance4 = initEmptyTable(nbColumn, nbLine, 0);
console.log(puissance4);

/**
 * Create an empty table for the game
 * @param {number} nbColumn
 * @param {number} nbLine
 * @param {*} char
 * @return {*[][]}
 */
function initEmptyTable(nbColumn, nbLine, char = '') {
    const table = [];
    for (let i = 0; i < nbLine; i++) {
        const line = [];
        for (let j = 0; j < nbColumn; j++) {
            line.push(char);
        }
        table.push(line);
    }
    return table;
}

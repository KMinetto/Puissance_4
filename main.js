let puissance4;
const nbColumn = 7, nbLine = 6;
const playerOneChar = "X";
const playerTwoChar = "O";

puissance4 = initEmptyTable(nbColumn, nbLine, 0);
displayPuissance4(puissance4, playerOneChar, playerTwoChar);

/**
 * Create an empty table for the game
 * @param {Number} nbColumn Column of table
 * @param {Number} nbLine Row of table
 * @param {*} char Char to use for empty cell in table
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

/**
 * Display personalized table
 * @param {Array<String>} tab Table to use
 * @param {String} p1Char Char of the Player 1
 * @param {String} p2Char Char of the Player 2
 */
function displayPuissance4(tab, p1Char, p2Char) {
    for (let i = 0; i < tab.length; i++) {
        let line = "";
        for (let j = 0; j < tab[i].length; j++) {
            line += "| "
            if (tab[i][j] === 0) {
                line += "_";
            } else if (tab[i][j] === 1) {
                line += p1Char;
            } else if (tab[i][j] === 2) {
                line += p2Char;
            }
            line += " |";
        }
        console.log(line);
    }
}

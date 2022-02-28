// ===== require ===== //
const readline = require('readline-sync');

// ===== let ===== //
let puissance4;
let finished = false;

// ===== Const ===== //
const nbColumn = 7, nbRow = 6;
const playerOne = 1;
const playerTwo = 2;
const playerOneChar = chooseChar(playerOne);
const playerTwoChar = chooseChar(playerTwo);

// ===== Logic ===== //
intro();
puissance4 = initEmptyTable(nbColumn, nbRow, 0);
displayPuissance4(puissance4, playerOneChar, playerTwoChar);;
while(true) {
    if (play(playerOne)) {
        finished = true;
        console.log(`Le joueur ${playerOne} a gagné`);
        return;
    }
    if (!finished && play(playerTwo)) {
        finished = true;
        console.log(`Le joueur ${playerTwo} a gagné`);
        return;
    }
}

// ===== Functions ===== //

function intro() {
    let text = "*******************************************************\n";
    text += "************** Bienvenue sur puissance 4 ************** \n";
    text += "*******************************************************\n";
    console.log(text);
}

function inputString(text) {
    return readline.question(text);
}

/**
 * Permit a player to choose a char to play with
 * @param {Number} player
 * @return {string} return the char that the player chose
 */
function chooseChar(player) {
    const text = `Veuillez choisir le caractère que vous voulez pour le joueur ${player} : \n`;
    return inputString(text).toUpperCase();
}

/**
 * Create an empty table for the game
 * @param {Number} nbColumn Column of table
 * @param {Number} nbRow Row of table
 * @param {*} char Char to use for empty cell in table
 * @return {*[][]}
 */
function initEmptyTable(nbColumn, nbRow, char = '') {
    const table = [];
    for (let i = 0; i < nbRow; i++) {
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

/**
 * Permit a player to choose a cell in table
 * Return true if one of each player win
 * @param {Number} player ID of player (1 or 2)
 * @return {boolean} Verify if the game is finished
 */
function play(player) {
    let emptyRow = -1;
    let column = -1;
    while (emptyRow === -1 || column <= 0 || column > 7) {
        column = chooseColumn();
        emptyRow = returnRowEmptyColumn(column);
    }
    puissance4[emptyRow][column - 1] = player;
    displayPuissance4(puissance4, playerOneChar, playerTwoChar);
    return verifyEndGame(player);
}

/**
 * Ask a player to choose a column to place token in the table
 * @return {Number} The column in the table
 */
function chooseColumn() {
    return parseInt(inputString("Quelle colonne choisissez-vous ?"));
}

/**
 * Return the first empty row of a column
 * @param {Number} column return -1 if column is full
 * @return {number}
 */
function returnRowEmptyColumn(column) {
    for (let i = nbRow - 1; i >= 0; i--) {
         if (verifyEmptyCell(i, column)) {
             return i;
         }
    }
    return -1;
}

/**
 *  Return a cell if empty (true or false)
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function verifyEmptyCell(row, column) {
    return puissance4[row][column - 1] === 0;
}

/**
 * Verify if a player won
 * @param {Number} player Id of player
 * @return {boolean} return true or false
 */
function verifyEndGame(player) {
    return !!(verifyRowEndGame(player) ||
        verifyColumnEndGame(player) ||
        verifyDiagonalEndGame(player));
}

/**
 * Verify if 4 tokens of a player are aligned
 * @param {Number} player Id of player
 * @return {boolean} return true or false
 */
function verifyRowEndGame(player) {
    for (let i = nbRow - 1; i >= 0; i--) {
        for (let j = 0; j < nbColumn - 3; j++) {
            if (
                puissance4[i][j] === player &&
                puissance4[i][j + 1] === player &&
                puissance4[i][j + 2] === player &&
                puissance4[i][j + 3] === player
            ) return true;
        }
    }
    return false;
}

/**
 * Verify if 4 tokens of a player are in column
 * @param player
 * @return {boolean} Return true or false
 */
function verifyColumnEndGame(player) {
    for (let i = 0; i < nbColumn; i++) {
        for (let j = nbRow - 4; j >= 0; j--) {
            if (
                puissance4[j][i] === player &&
                puissance4[j + 1][i] === player &&
                puissance4[j + 2][i] === player &&
                puissance4[j + 3][i] === player
            ) return true;
        }
    }
}

/**
 * Verify if 4 of a player's chips are diagonal
 * @param player
 * @return {boolean}
 */
function verifyDiagonalEndGame(player) {
    for (let i = nbRow - 1; i >= 3; i--) {
        for (let j = 0; j < nbColumn; j++) {
            if (
                puissance4[i][j] === player &&
                puissance4[i - 1][j + 1] === player &&
                puissance4[i - 2][j + 2] === player &&
                puissance4[i - 3][j + 3] === player
            ) return true;
            if (
                puissance4[i][j] === player &&
                puissance4[i - 1][j - 1] === player &&
                puissance4[i - 2][j - 2] === player &&
                puissance4[i - 3][j - 3] === player
            ) return true;
        }
    }
    return false;
}

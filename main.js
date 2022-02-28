// ===== require ===== //
const toolbox = require('./toolBox');
const game = require('./game');

// ===== Logic ===== //
intro();
game.playerOneChar = chooseChar(1);
game.playerTwChar = chooseChar(2);
game.init();
game.displayPuissance4();

while(true) {
    if (play(game.playerOne)) {
        game.finished = true;
        console.log(`Le joueur ${game.playerOne} a gagné`);
        return;
    }
    if (play(game.playerTwo)) {
        game.finished = true;
        console.log(`Le joueur ${game.playerTwo} a gagné`);
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

/**
 * Permit a player to choose a char to play with
 * @param {Number} player
 * @return {string} return the char that the player chose
 */
function chooseChar(player) {
    const text = `Veuillez choisir le caractère que vous voulez pour le joueur ${player} : \n`;
    return toolbox.inputString(text).toUpperCase();
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
        column = game.chooseColumn();
        emptyRow = returnRowEmptyColumn(column);
    }
    game.play(player, emptyRow, column);
    game.displayPuissance4(game.puissance4, game.playerOneChar, game.playerTwoChar);
    return game.verifyEndGame(player);
}

/**
 * Return the first empty row of a column
 * @param {Number} column return -1 if column is full
 * @return {number}
 */
function returnRowEmptyColumn(column) {
    for (let i = game.nbRow - 1; i >= 0; i--) {
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
    return game.puissance4[row][column - 1] === 0;
}

// ===== Require ===== //
const toolbox = require("./toolBox");

// ===== let / const ===== //
const game = {
    puissance4: [],
    finished: false,
    nbColumn: 7,
    nbRow:6,
    playerOne: 1,
    playerTwo: 2,
    playerOneChar: "X",
    playerTwoChar: "O",

    init: function() {
        this.puissance4 = toolbox.initEmptyTable(this.nbColumn, this.nbRow, 0);
    },

    /**
     * Display personalized table
     */
    displayPuissance4: function() {
        for (let i = 0; i < this.puissance4.length; i++) {
            let line = "";
            for (let j = 0; j < this.puissance4[i].length; j++) {
                line += "| "
                if (this.puissance4[i][j] === 0) {
                    line += "_";
                } else if (this.puissance4[i][j] === 1) {
                    line += this.playerOneChar;
                } else if (this.puissance4[i][j] === 2) {
                    line += this.playerTwoChar;
                }
                line += " |";
            }
            console.log(line);
        }
    },

    /**
     * Ask a player to choose a column to place token in the table
     * @return {Number} The column in the table
     */
    chooseColumn: function() {
        return parseInt(toolbox.inputString("Quelle colonne choisissez-vous ? \n"));
    },

    play: function(player, row, colum,) {
        this.puissance4[row][colum - 1] = player;
    },

    /**
     * Verify if a player won
     * @param {Number} player Id of player
     * @return {boolean} return true or false
     */
    verifyEndGame: function(player) {
        return !!(this.verifyRowEndGame(player) ||
            this.verifyColumnEndGame(player) ||
            this.verifyDiagonalEndGame(player));
    },

    /**
     * Verify if 4 tokens of a player are aligned
     * @param {Number} player Id of player
     * @return {boolean} return true or false
     */
    verifyRowEndGame: function(player) {
        for (let i = this.nbRow - 1; i >= 0; i--) {
            for (let j = 0; j < this.nbColumn - 3; j++) {
                if (
                    this.puissance4[i][j] === player &&
                    this.puissance4[i][j + 1] === player &&
                    this.puissance4[i][j + 2] === player &&
                    this.puissance4[i][j + 3] === player
                ) return true;
            }
        }
        return false;
    },

    /**
     * Verify if 4 tokens of a player are in column
     * @param player
     * @return {boolean} Return true or false
     */
    verifyColumnEndGame: function(player) {
        for (let i = 0; i < this.nbColumn; i++) {
            for (let j = this.nbRow - 4; j >= 0; j--) {
                if (
                    this.puissance4[j][i] === player &&
                    this.puissance4[j + 1][i] === player &&
                    this.puissance4[j + 2][i] === player &&
                    this.puissance4[j + 3][i] === player
                ) return true;
            }
        }
    },

    /**
     * Verify if 4 of a player's chips are diagonal
     * @param player
     * @return {boolean}
     */
    verifyDiagonalEndGame: function(player) {
        for (let i = this.nbRow - 1; i >= 3; i--) {
            for (let j = 0; j < this.nbColumn; j++) {
                if (
                    this.puissance4[i][j] === player &&
                    this.puissance4[i - 1][j + 1] === player &&
                    this.puissance4[i - 2][j + 2] === player &&
                    this.puissance4[i - 3][j + 3] === player
                ) return true;
                if (
                    this.puissance4[i][j] === player &&
                    this.puissance4[i - 1][j - 1] === player &&
                    this.puissance4[i - 2][j - 2] === player &&
                    this.puissance4[i - 3][j - 3] === player
                ) return true;
            }
        }
    return false;
}
}
module.exports = game;

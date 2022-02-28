// ===== Require ===== //
const readline = require("readline-sync");

const toolbox = {
    inputString:
    function(text) {
        return readline.question(text);
    },
    initEmptyTable:
    /**
     * Create an empty table for the game
     * @param {Number} nbColumn Column of table
     * @param {Number} nbRow Row of table
     * @param {*} char Char to use for empty cell in table
     * @return {*[][]}
     */
    function(nbColumn, nbRow, char = '') {
        const table = [];
        for (let i = 0; i < nbRow; i++) {
            const line = [];
            for (let j = 0; j < nbColumn; j++) {
                line.push(char);
            }
            table.push(line);
        }
        return table;
    },
}
module.exports = toolbox;

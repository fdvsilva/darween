const Player = require('../models/player.js');
const Board = require('../models/board.js');
const mongoose = require('./mongoose.js');


function cleanData() {
  Board.remove({})
  .then (_ => Player.remove({}))
  .catch (error => "Error while cleaning all documents from tables Board and Player!")
}

module.exports = cleanData;

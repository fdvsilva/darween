const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');
const customErrors = require('../../../errors/custom-errors.js');
const NotInABoard = customErrors.NotInABoard;
const mongoose = require('../../../db/mongoose.js');
//const MIN_PLAYERS_NUMBER = 1;

const handleDisconnectActionWrapper = (MIN_PLAYERS_NUMBER) => {
  return handleDisconnectAction = (socketId) => {

    // Finds Player
    var findPlayerPromise = Player.findOne({socketId});

    // Finds Player's Board
    var findBoardPromise = findPlayerPromise
    .then (player => {
      return Board.findOne({_id: player.boardId});
    })

    return Promise.all([findPlayerPromise, findBoardPromise])
    .then(result => {

      let player = result[0];
      let board = result[1];
      console.log("BOARD.MODEL");
      console.log(board);
      let boardAction = () => board;

      /* If there is no board then there is no need to
      update or remove it
      */
      if (board) {
        if ((board.playersNumber - 1) > MIN_PLAYERS_NUMBER ) {
          board.playersNumber--;
          board.players[player.name] = null;
          boardAction = board.save.bind(board);
        } else {
          boardAction = board.remove.bind(board);
        }
      }
      /*  Removes player and board if there are no more
          than MIN_NUMBER_PLAYER
      */
      return Promise.all([boardAction(),player.remove()]);
    })
  }
}

module.exports = handleDisconnectActionWrapper;

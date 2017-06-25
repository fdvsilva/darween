const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');
const customErrors = require('../../../errors/custom-errors.js');
const NotInABoard = customErrors.NotInABoard;
const MIN_NUMBER_PLAYERS = 1;

const handleDisconnectAction = (socketId) => {

  // Finds Player
  var findPlayerPromise = Player.findOne({socketId});

  // Finds Player's Board
  var findBoardPromise = findPlayerPromise
  .then (player => {
    return Board.findOne({_id: player.boardId});
  })

  return Promise.all([findPlayerPromise, findBoardPromise])
  .then(result => {
    let boardAction = Promise.resolve.bind(Promise);
    let player = result[0];
    let board = result[1];
    
    /* If there is no board then there is no need to
       update or remove it
     */
    if (board) {
      if (board.players.length > MIN_NUMBER_PLAYERS) {
        board.players.splice(board.players.indexOf(player._id), 1);
        player.boardId = null;
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

module.exports = handleDisconnectAction;

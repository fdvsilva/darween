const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');
const customErrors = require('../../../errors/custom-errors.js');
const NotInABoard = customErrors.NotInABoard;

const handleLeaveAction = (socketId) => {

  // Finds Player
  var findPlayerPromise = Player.findOne({socketId});

  // Finds Player's Board
  var findBoardPromise = findPlayerPromise
  .then (player => {
    if (!player.boardId) {throw new NotInABoard()};
    return Board.findOne({_id: player.boardId});
  })

  return Promise.all([findPlayerPromise, findBoardPromise])
  .then(result => {
    var player = result[0];
    var board = result[1];
    board.players.splice(board.players.indexOf(player._id), 1);
    player.boardId = null;
    /*  Removes linking between player and board
        from Player and Board document.
     */
    return Promise.all([board.save(), player.save()]);
  })
}

module.exports = handleLeaveAction;

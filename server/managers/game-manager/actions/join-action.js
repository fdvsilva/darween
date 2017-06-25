const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');
const customErrors = require('../../../errors/custom-errors.js');
const AlreadyInABoard = customErrors.AlreadyInABoard;

const handleJoinActionWrapper = (MAX_PLAYERS_NUMBER) => {
  return handleJoinAction = (socketId) => {

    /* Checks if player is already in a board, if so, then aborts all
    the next promises in order to prevent the user from joining
    two board at the same timeout
    */
    var checkIfPlayerIsAlreadyInABoardPromise = Player.findOne({socketId})
    .then (player => {
      if (player && player.boardId) {throw new AlreadyInABoard()}
    })


    /* Returns current board if it is not full
    or returns a new one, otherwise */
    var currentBoardPromise = checkIfPlayerIsAlreadyInABoardPromise
    .then(_ => Board.find().sort({$natural:-1}).limit(1))
    .then((docs) => {
      if (docs.length === 0 || docs[0].players.length === MAX_PLAYERS_NUMBER) {
        board = new Board();
        return board.save();
      }
      return docs[0];
    })

    /* Updates player with the board it was assigned to ot
    create a new one if it does not exist */
    var playerPromise = currentBoardPromise
    .then(board => {
      return Player.findOneAndUpdate(
        {socketId},
        {socketId: socketId, boardId: board._id},
        {new: true, upsert: true}
      )
    })

    /* Updates board with the reference to the player */
    return Promise.all([currentBoardPromise, playerPromise])
    .then(result => {
      var currentBoard = result[0];
      var newPlayer = result[1];
      currentBoard.players.push(newPlayer._id);
      if (currentBoard.players.length >= MAX_PLAYERS_NUMBER) currentBoard.isBoardFull = true;
      return Promise.all([currentBoard.save(), newPlayer]);
    })


  }
}

module.exports = handleJoinActionWrapper;

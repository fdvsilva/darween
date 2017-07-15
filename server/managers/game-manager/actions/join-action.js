const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');
const customErrors = require('../../../errors/custom-errors.js');
const AlreadyInABoard = customErrors.AlreadyInABoard;

const handleJoinActionWrapper = (MAX_PLAYERS_NUMBER) => {
  return handleJoinAction = (socketId) => {

    /* Checks if player is already in a board, if so, then aborts all
    the next promises in order to prevent the user from joining
    two board at the same time
    */
    var checkIfPlayerIsAlreadyInABoardPromise = Player.findOne({socketId})
    .then (player => {
      if (player && player.boardId) {throw new AlreadyInABoard()}
    })

    /* Returns the current board if it is not full
       otherwise returns a new one
     */
    var currentBoardPromise = checkIfPlayerIsAlreadyInABoardPromise
    .then(_ => Board.find().sort({$natural:-1}).limit(1))
    .then((boards) => {
      if (boards.length === 0 || boards[0].numberPlayers === MAX_PLAYERS_NUMBER) {
        board = new Board();
        return board.save();
      }
      return boards[0];
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
      newPlayer.name = currentBoard.nextPlayerName();
      currentBoard.players[newPlayer.name] = newPlayer._id;
      /* Update the number of player */
      currentBoard.playersNumber++;
      if (currentBoard.playersNumber >= MAX_PLAYERS_NUMBER) {
        currentBoard.isBoardFull = true;
        /* Sets the start time to the first step of the game.
           This time is then compared with the user's response
           time in order ensure the response came within the
           next X seconds where X is
           currentBoard.stepInfo.currentStepDuration
          */
        currentBoard.stepInfo.stepsStartTime[currentBoard.stepInfo.currentStep] = new Date().getTime();
      }
      return Promise.all([currentBoard.save(), newPlayer.save()])
    })



  }
}

module.exports = handleJoinActionWrapper;

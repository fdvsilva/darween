const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');
const customErrors = require('../../../errors/custom-errors.js');
const gameSteps = require('../steps/game-steps.js');
const NotInABoard = customErrors.NotInABoard;
const TimerTimedOut = customErrors.TimerTimedOut;

const handleAddPOVAction = (socketId, pov, timeStamp) => {

  /* Checks if player is in a board, if not, then aborts all
  the next promises
  */
  const findPlayerPromise = Player.findOne({socketId})
  .then (player => {
    if (!player.boardId) {throw new NotInABoard()}
    return player;
  })

  /* Checks if the board actually exists, if not, then aborts all
  the next promises
  */
  const findBoardPromise = findPlayerPromise
  .then(player => Board.findOne({_id: player.boardId}))
  .then(board => {
      if (!board) {throw new NotInABoard()}
      return board;
  })

  return Promise.all([findPlayerPromise, findBoardPromise])
  .then (result => {
    var player = result[0];
    var board = result[1];
    var thresholdTime = board.stepInfo.stepsStartTime[gameSteps.WAITING_FOR_POINT_OF_VIEWS] + gameSteps.stepDuration(gameSteps.WAITING_FOR_POINT_OF_VIEWS)
    if (timeStamp <= thresholdTime) {
      //board.povs.push({playerName: player.name, pov});
      board.povsInfo.povs[player.name] = pov;
      board.povsInfo.povsNumber++;
    } else {
      throw new TimerTimedOut()
    }
    return Promise.all([board.save(), player]);
   })


}

module.exports = handleAddPOVAction;

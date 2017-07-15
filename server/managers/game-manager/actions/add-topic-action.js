const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');
const customErrors = require('../../../errors/custom-errors.js');
const gameSteps = require('../steps/game-steps.js');
const NotInABoard = customErrors.NotInABoard;
const TimerTimedOut = customErrors.TimerTimedOut;
const NotYourTurn = customErrors.NotYourTurn;

const handleAddTopicAction = (socketId, topic, timeStamp) => {

  /*
    Checks if player is in a board, if not, then aborts all
    the next promises
  */
  const findPlayerPromise = Player.findOne({socketId})
  .then (player => {
    if (!player.boardId) {throw new NotInABoard()}
    return player;
  })

  /*
     Checks if the board actually exists, if not, then aborts all
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
    var thresholdTime = board.stepInfo.stepsStartTime[gameSteps.WAITING_FOR_TOPIC] + gameSteps.stepDuration(gameSteps.WAITING_FOR_TOPIC)
    /* Besides ensuring the topic was sent within the allowed time frame we are
       also making sure the current step is 'WAITING_FOR_TOPIC', otherwise we
       might be setting a topic after the server sending an 'OPEN TOPIC' request
       to the users.
       The scenario might happen when the server did not get the topic within the
       allowed time frame.
      */
    if ((timeStamp <= thresholdTime) && (board.stepInfo.currentStep === gameSteps.WAITING_FOR_TOPIC)) {
      if (player.name !== board.playerForTopic.name) throw new NotYourTurn();
      console.log("TOPIC" + topic);
      board.topic = topic;
    } else {
      throw new TimerTimedOut()
    }
    return Promise.all([board.save(), player]);
   })


}

module.exports = handleAddTopicAction;

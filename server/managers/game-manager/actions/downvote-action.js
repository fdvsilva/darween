const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');
const customErrors = require('../../../errors/custom-errors.js');
const gameSteps = require('../steps/game-steps.js');
const NotInABoard = customErrors.NotInABoard;
const TimerTimedOut = customErrors.TimerTimedOut;
const DownvoteYourOwn = customErrors.DownvoteYourOwn;
const DownvoteOfflinePlayers = customErrors.DownvoteOfflinePlayers;
const BoardIsNotFull = customErrors.BoardIsNotFull;

const handleDownvoteAction = (socketId, playerDownvoted) => {

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
    if (!board.isBoardFull) throw new BoardIsNotFull();
    if (playerDownvoted === player.name) throw new DownvoteYourOwn();
    if (!board.players[playerDownvoted]) throw new DownvoteOfflinePlayers();

    if (playerDownvoted === 'remove') board.playersDownvote[player.name] = "";
    else board.playersDownvote[player.name] = playerDownvoted;
    return Promise.all([board.save(), player]);
   })


}

module.exports = handleDownvoteAction;

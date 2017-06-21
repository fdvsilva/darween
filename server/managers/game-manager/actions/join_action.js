const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');

const handleJoinActionWrapper = (MAX_PLAYERS_NUMBER) => {
  return handleJoinAction = (socketId) => {

      var currentBoardPromise = Board.find().sort({$natural:-1}).limit(1)
      .then((docs) => {
        if (docs.length === 0 || docs[0].players.length === MAX_PLAYERS_NUMBER) {
          board = new Board({});
          return board.save();
        }
        return docs[0];
      })

      var newPlayerPromise = currentBoardPromise
      .then(doc => {
        player = new Player({socketId: socketId});
        return player.save();
      })

      return Promise.all([currentBoardPromise, newPlayerPromise])
      .then(result => {
        var currentBoard = result[0];
        var newPlayer = result[1];
        currentBoard.players.push(newPlayer._id);
        return currentBoard.save()
      })
    }
}

module.exports = handleJoinActionWrapper;

const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');

const handleJoinEvent = (taskManager, socket, MAX_PLAYERS_NUMBER) => {

    socket.on("join", (message) => {
      console.log(`${socket.id}: ${message}`);
      
      taskManager.enqueueTask(socket.id, 10);

      /*
      var currentBoardPromise = Board.find().sort({$natural:-1}).limit(1).then((docs) => {
        if (docs.length === 0 || docs[0].players.length === MAX_PLAYERS_NUMBER) {
          board = new Board({});
          return board.save();
        }
        return docs[0];
      });

      var newPlayerPromise = currentBoardPromise
      .then(doc => {
        player = new Player({socketId: socket.id});
        return player.save();
      });

      Promise.all([currentBoardPromise, newPlayerPromise])
      .then(result => {
        var currentBoard = result[0];
        var newPlayer = result[1];
        currentBoard.players.push(newPlayer._id);
        return currentBoard.save()
      }).then (updatedBoard => {
        updatedBoard.initBoard(socket);
        //console.log(updatedBoard);
      })
      */
    });

}

module.exports = handleJoinEvent;

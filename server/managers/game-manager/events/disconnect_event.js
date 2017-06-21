const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');

const handleDisconnectEvent = (socket) => {

    socket.on('disconnect', () => {
      console.log(`${socket.id}: User was disconnected`);
    });
}

module.exports = handleDisconnectEvent;

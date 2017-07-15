const Player = require('../../../models/player.js');
const mongoose = require('../../../db/mongoose.js');

  const handleConnectAction = (socketId) => {
    let player = new Player({socketId});
    return player.save();
  }

module.exports = handleConnectAction;

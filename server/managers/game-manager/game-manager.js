//const handleJoinEvent = require('./events/join_event.js');
//const handleDisconnectEvent = require('./events/disconnect_event.js');
//const taskManager = require('../task-manager/task-manager.js')();
const MAX_PLAYERS_NUMBER = 2;
const handleJoinAction = require('./actions/join_action.js')(MAX_PLAYERS_NUMBER);

module.exports = {
  handleJoinAction
}

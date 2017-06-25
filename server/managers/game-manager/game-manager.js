//const handleJoinEvent = require('./events/join_event.js');
//const handleDisconnectEvent = require('./events/disconnect_event.js');
//const taskManager = require('../task-manager/task-manager.js')();
const MAX_PLAYERS_NUMBER = 2;
const handleConnectAction = require('./actions/connect-action.js');
const handleJoinAction = require('./actions/join-action.js')(MAX_PLAYERS_NUMBER);
const handleLeaveAction = require('./actions/leave-action.js');
const handleDisconnectAction = require('./actions/disconnect-action.js');

module.exports = {
  handleConnectAction,
  handleJoinAction,
  handleLeaveAction,
  handleDisconnectAction
}

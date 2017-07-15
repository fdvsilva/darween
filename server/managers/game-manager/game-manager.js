//const handleJoinEvent = require('./events/join_event.js');
//const handleDisconnectEvent = require('./events/disconnect_event.js');
//const taskManager = require('../task-manager/task-manager.js')();
const MAX_PLAYERS_NUMBER = 2;
const MIN_PLAYERS_NUMBER = 1;
const handleConnectAction = require('./actions/connect-action.js');
const handleJoinAction = require('./actions/join-action.js')(MAX_PLAYERS_NUMBER);
const handleLeaveAction = require('./actions/leave-action.js');
const handleDownvoteAction = require('./actions/downvote-action.js');
const handleUpdateBoardAction = require('./actions/update-board-action.js');
const handleAddPOVAction = require('./actions/add-pov-action.js');
const handleAddTopicAction = require('./actions/add-topic-action.js');
const handleDisconnectAction = require('./actions/disconnect-action.js')(MIN_PLAYERS_NUMBER);

module.exports = {
  handleConnectAction,
  handleJoinAction,
  handleLeaveAction,
  handleDisconnectAction,
  handleUpdateBoardAction,
  handleAddPOVAction,
  handleAddTopicAction,
  handleDownvoteAction
}

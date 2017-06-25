const TIMER = 'TIMER';
const TIMER_FOR_TOPIC = 'TIMER_FOR_TOPIC';
const TIMER_FOR_POV = 'TIMER_FOR_POINT_OF_VIEW';
const TIMER_FOR_READING = 'TIMER_FOR_READING';
const CONNECT = 'CONNECT';
const JOIN = 'JOIN';
const LEAVE = 'LEAVE';
const DISCONNECT = 'DISCONNECT';

function createConnectTask(userId) {
  return {type: CONNECT, userId};
}

function createJoinTask(userId) {
  return {type: JOIN, userId};
}

function createLeaveTask(userId) {
  return {type: LEAVE, userId};
}

function createDisconnectTask(userId) {
  return {type: DISCONNECT, userId};
}

function createTimerTask(boardId, step) {
  return {type: TIMER, boardId, step};
}

function createTopicTimerTask(boardId) {
  return {type: TIMER_FOR_TOPIC, boardId};
}

function createPOVTimerTask(boardId) {
  return {type: TIMER_FOR_POV, boardId};
}

function createReadingTimerTask(boardId) {
  return {type: TIMER_FOR_READING, boardId};
}

function getTaskProperty(task, prop) {
  return task[prop];
}

module.exports = {
  createConnectTask,
  createJoinTask,
  createLeaveTask,
  createDisconnectTask,
  getTaskProperty,
  createTimerTask,
  createTopicTimerTask,
  createPOVTimerTask,
  createReadingTimerTask,
  TIMER,
  TIMER_FOR_TOPIC,
  TIMER_FOR_POV,
  TIMER_FOR_READING,
  CONNECT,
  JOIN,
  LEAVE,
  DISCONNECT
}

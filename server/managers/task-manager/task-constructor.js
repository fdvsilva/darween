const TIMER = 'TIMER';
const TIMER_FOR_TOPIC = 'TIMER_FOR_TOPIC';
const TIMER_FOR_POV = 'TIMER_FOR_POINT_OF_VIEW';
const TIMER_FOR_READING = 'TIMER_FOR_READING';
const CONNECT = 'CONNECT';
const JOIN = 'JOIN';
const LEAVE = 'LEAVE';
const DISCONNECT = 'DISCONNECT';
const ADD_POV = 'ADD_POV';
const ADD_TOPIC = 'ADD_TOPIC';
const DOWNVOTE = 'DOWNVOTE';

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

function createAddPOVTask(userId, pov, timeStamp) {
  return {type: ADD_POV, userId, pov, timeStamp};
}

function createAddTopicTask(userId, topic, timeStamp) {
  return {type: ADD_TOPIC, userId, topic, timeStamp};
}

function createDownvoteTask(userId, playerDownvoted) {
  return {type: DOWNVOTE, userId, playerDownvoted: playerDownvoted.toLowerCase()};
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
  createAddPOVTask,
  createAddTopicTask,
  createReadingTimerTask,
  createDownvoteTask,
  TIMER,
  TIMER_FOR_TOPIC,
  TIMER_FOR_POV,
  TIMER_FOR_READING,
  CONNECT,
  JOIN,
  LEAVE,
  DISCONNECT,
  ADD_POV,
  ADD_TOPIC,
  DOWNVOTE
}

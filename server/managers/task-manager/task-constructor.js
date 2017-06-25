function createConnectTask(userId) {
  return {type: 'CONNECT', userId};
}

function createJoinTask(userId) {
  return {type: 'JOIN', userId};
}

function createLeaveTask(userId) {
  return {type: 'LEAVE', userId};
}

function createDisconnectTask(userId) {
  return {type: 'DISCONNECT', userId};
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
  CONNECT: 'CONNECT',
  JOIN: 'JOIN',
  LEAVE: 'LEAVE',
  DISCONNECT: 'DISCONNECT'
}

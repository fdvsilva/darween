function createJoinTask(userId) {
  return {type: 'JOIN', userId};
}

function getTaskProperty(task, prop) {
  return task[prop];
}


module.exports = {
  createJoinTask,
  getTaskProperty,
  JOIN: 'JOIN'
}

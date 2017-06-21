function NoReadyTasks() {
  //this.constructor.prototype = Object.create(Error.prototype);
  Error.captureStackTrace(this, NoReadyTasks);
  this.name = 'NoReadyTasks';
  this.message = 'There is no ready tasks';
}

NoReadyTasks.prototype = Object.create(Error.prototype);


module.exports = {
  NoReadyTasks : NoReadyTasks
}

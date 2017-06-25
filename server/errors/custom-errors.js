function NoReadyTasks() {
  Error.captureStackTrace(this, NoReadyTasks);
  this.name = 'NoReadyTasks';
  this.message = 'There is no ready tasks';
}
NoReadyTasks.prototype = Object.create(Error.prototype);


function NotInABoard() {
  Error.captureStackTrace(this, NotInABoard);
  this.name = 'NotInABoard';
  this.message = 'You are not in a board';
}
NotInABoard.prototype = Object.create(Error.prototype);

function AlreadyInABoard() {
  Error.captureStackTrace(this, AlreadyInABoard);
  this.name = 'AlreadyInABoard';
  this.message = 'You are already in a board';
}

AlreadyInABoard.prototype = Object.create(Error.prototype);

module.exports = {
  NoReadyTasks,
  NotInABoard,
  AlreadyInABoard,
}

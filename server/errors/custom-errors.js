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

function TimerTimedOut() {
  Error.captureStackTrace(this, TimerTimedOut);
  this.name = 'TimerTimedOut';
  this.message = 'Timer has timed out';
}

TimerTimedOut.prototype = Object.create(Error.prototype);


function NotYourTurn() {
  Error.captureStackTrace(this, NotYourTurn);
  this.name = 'NotYourTurn';
  this.message = 'It is not your turn, please wait!';
}

NotYourTurn.prototype = Object.create(Error.prototype);

function DownvoteYourOwn() {
  Error.captureStackTrace(this, DownvoteYourOwn);
  this.name = 'DownvoteYourOwn';
  this.message = 'You cannot downvote yourself';
}

DownvoteYourOwn.prototype = Object.create(Error.prototype);


function DownvoteOfflinePlayers() {
  Error.captureStackTrace(this, DownvoteOfflinePlayers);
  this.name = 'DownvoteOfflinePlayers';
  this.message = 'You cannot downvote offline players';
}

DownvoteOfflinePlayers.prototype = Object.create(Error.prototype);


function BoardIsNotFull() {
  Error.captureStackTrace(this, BoardIsNotFull);
  this.name = 'BoardIsNotFull';
  this.message = 'Board is not full';
}

BoardIsNotFull.prototype = Object.create(Error.prototype);

module.exports = {
  NoReadyTasks,
  NotInABoard,
  AlreadyInABoard,
  TimerTimedOut,
  NotYourTurn,
  DownvoteYourOwn,
  DownvoteOfflinePlayers,
  BoardIsNotFull
}

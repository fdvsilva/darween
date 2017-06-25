const taskManager = require('../managers/task-manager/task-manager.js')();
var io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
const taskConstructor = require('../managers/task-manager/task-constructor.js');
const gameManager = require('../managers/game-manager/game-manager.js');
const mongoose = require('../db/mongoose.js');

function taskHandler (handlerFunction, handlerFunctionArgs, taskName, taskHandlerCb) {
  handlerFunction.apply(null, handlerFunctionArgs)
  /* taskFinalValue = [board, player] */
  .then (taskFinalValue => {taskHandlerCb.apply(null, taskFinalValue)})
  .catch (e => console.log(`Action ${taskName} failed: ${e}`))
}

function taskSwitcher (task) {
  let taskObject = JSON.parse(task[1]);
  let taskType = taskConstructor.getTaskProperty(taskObject, 'type');
  let userId = taskConstructor.getTaskProperty(taskObject, 'userId');
  /*
     Default callback after performing task sucessfully.
     Do nothing by default !
   */
  let taskHandlerCb;
  switch (taskType) {
    case taskConstructor.CONNECT :
     //console.log(taskConstructor.CONNECT)
      taskHandlerCb = ( _ => null );
      taskHandler(gameManager.handleConnectAction, [userId], taskConstructor.CONNECT, taskHandlerCb);
      break;
    case taskConstructor.JOIN :
      taskHandlerCb = (board, user) => io.to(user.socketId).emit("join:channel:request", board._id.toString());
      taskHandler(gameManager.handleJoinAction, [userId], taskConstructor.JOIN, taskHandlerCb);
      //io.to(userId.replace(/['"]+/g, '')).emit('test', 'TOMAaaaaaaaa');
      break;
    case taskConstructor.LEAVE :
     taskHandlerCb = (board, user) => io.to(board._id.toString()).emit('leave:room', "User XXX has left the room");
     taskHandler(gameManager.handleLeaveAction, [userId], taskConstructor.LEAVE, taskHandlerCb);
      break;
    case taskConstructor.DISCONNECT :
      taskHandlerCb = ( _ => null );
      taskHandler(gameManager.handleDisconnectAction, [userId], taskConstructor.DISCONNECT, taskHandlerCb);
      break;
    default:
  }
}

/* Move tasks to a QUEUE to be executed */
function taskProcessor () {
  //taskManager.dequeueTask.bind(taskManager)
  //console.log(taskManager.dequeueTask);
  taskManager.dequeueTask()
  .then (task => {
    //if (task) console.log("TASK: " + task.split(",")[1]);
    if (task) taskSwitcher(task);
    setTimeout(taskProcessor, 0)
  })
  //console.log('NOT BLOCKED')
};

taskProcessor();

//taskManager.dequeueTask()

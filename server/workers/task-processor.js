const taskManager = require('../managers/task-manager/task-manager.js')();
var io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
const taskConstructor = require('../managers/task-manager/task-constructor.js');
const gameManager = require('../managers/game-manager/game-manager.js');
const gameSteps = require('../managers/game-manager/steps/game-steps.js');
const mongoose = require('../db/mongoose.js');

function taskHandler (handlerFunction, handlerFunctionArgs, task, taskName, taskHandlerCb) {
  handlerFunction.apply(null, handlerFunctionArgs)
  /* taskFinalValue = [board, player] */
  .then (taskFinalValue => {taskHandlerCb.apply(null, taskFinalValue)})
  .then (_ =>  taskManager.markTaskAsCompleted(task, (new Date().getTime())))
  //.then (res => console.log(res))
  .catch (e => console.log(`Action ${taskName} failed: ${e}`))
}


function taskSwitcher (task) {
  console.log(task);
  let taskObject = JSON.parse(task.split('#')[1]);
  console.log(taskObject);
  let taskType = taskConstructor.getTaskProperty(taskObject, 'type');
  let userId = taskConstructor.getTaskProperty(taskObject, 'userId');
  let boardId = taskConstructor.getTaskProperty(taskObject, 'boardId');
  let step = taskConstructor.getTaskProperty(taskObject, 'step');
  /*
     Default callback after performing task sucessfully.
   */
  let taskHandlerCb;
  switch (taskType) {
    case taskConstructor.CONNECT :
     console.log(taskConstructor.CONNECT);

      taskHandlerCb = ( _ => null ); // Do Nothing
      taskHandler(gameManager.handleConnectAction, [userId], task, taskConstructor.CONNECT, taskHandlerCb);
      break;
    case taskConstructor.JOIN :
      taskHandlerCb = (board, user) => {
        if (board.isBoardFull) {
          let initalStep = gameSteps.initialStep();
          let initialStepTime = gameSteps.initialStepTime();
          taskManager.enqueueTask(taskConstructor.createTimerTask(board._id, initalStep), initialStepTime);
        }
        io.to(user.socketId).emit("join:channel:request", board._id.toString());
      }
      taskHandler(gameManager.handleJoinAction, [userId], task, taskConstructor.JOIN, taskHandlerCb);
      break;
    case taskConstructor.LEAVE :
     taskHandlerCb = (board, user) => io.to(board._id.toString()).emit('leave:room', "User XXX has left the room");
     taskHandler(gameManager.handleLeaveAction, [userId], task, taskConstructor.LEAVE, taskHandlerCb);
     break;
    case taskConstructor.TIMER :
      let nextStep = gameSteps.nextStep(step);
      let nextStepTime = gameSteps.nextStepTime(step);
      //console.log(`timer:${step}:finished`);
      //console.log(taskConstructor.createTimerTask(boardId, nextStep));
      //taskManager.enqueueTask(taskConstructor.createTimerTask(boardId, nextStep), nextStepTime);
      io.to(boardId).emit(`timer:${step}:finished`, `Time for ${step.toUpperCase()} has just finished`)
      //console.log(`TIMEOUT FOR ${step.toUpperCase()}`);
      break;
    case taskConstructor.DISCONNECT :
      taskHandlerCb = ( _ => null ); // Do Nothing
      taskHandler(gameManager.handleDisconnectAction, [userId], task, taskConstructor.DISCONNECT, taskHandlerCb);
      break;
    default:
  }
}

/* Move tasks to a QUEUE to be executed */
function taskProcessor () {
  taskManager.dequeueTask()
  .then (task => {
    //if (task) console.log("TASK: " + task);
    if (task) taskSwitcher(`${(new Date().getTime())}#${task}`);
    setTimeout(taskProcessor, 0)
  })
  //console.log('NOT BLOCKED')
};


taskProcessor();

//taskManager.dequeueTask()

const taskManager = require('../managers/task-manager/task-manager.js')();
var io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
const taskConstructor = require('../managers/task-manager/task-constructor.js');
const gameManager = require('../managers/game-manager/game-manager.js');
const gameSteps = require('../managers/game-manager/steps/game-steps.js');
const cleanData = require('../db/clean-data.js');
const customErrors = require('../errors/custom-errors.js');


function taskHandler (handlerFunction, handlerFunctionArgs, task, taskName, taskHandlerCb) {

  handlerFunction.apply(null, handlerFunctionArgs)
  /* taskFinalValue = [board, player] */
  .then (taskFinalValue => {taskHandlerCb.apply(null, taskFinalValue)})
  .catch(e => {
                var isErrorRecoverable = null;
                var recoverableErrors = [
                                          customErrors.NotInABoard,
                                          customErrors.AlreadyInABoard,
                                          customErrors.TimerTimedOut,
                                          customErrors.NotYourTurn,
                                          customErrors.DownvoteYourOwn,
                                          customErrors.DownvoteOfflinePlayers,
                                          customErrors.BoardIsNotFull
                                        ];
                recoverableErrors.forEach((recoverableError) => {
                  if (e instanceof recoverableError) {
                    console.log(`Caught a recoverable error: ${e}`);
                    isErrorRecoverable = true;
                    return;
                 }
               });
               if (isErrorRecoverable) return;
               throw e
  })
  .then (_ =>  {taskManager.markTaskAsCompleted(task, (new Date().getTime()))})
  //.then (res => console.log(res))
  .catch (e => console.log(`Action ${taskName} failed: ${e}`))
}



function taskSwitcher (task) {
  //console.log(task);
  let taskObject = JSON.parse(task.split('#')[1]);
  //console.log(taskObject);
  let taskType = taskConstructor.getTaskProperty(taskObject, 'type');
  let userId = taskConstructor.getTaskProperty(taskObject, 'userId');
  let pov = taskConstructor.getTaskProperty(taskObject, 'pov');
  let timeStamp = taskConstructor.getTaskProperty(taskObject, 'timeStamp');
  let boardId = taskConstructor.getTaskProperty(taskObject, 'boardId');
  let step = taskConstructor.getTaskProperty(taskObject, 'step');
  let topic = taskConstructor.getTaskProperty(taskObject, 'topic');
  let playerDownvoted = taskConstructor.getTaskProperty(taskObject, 'playerDownvoted');
  /*
      Default callback after performing task sucessfully.
      Each task should specify this callback in order to fit its needs!
   */
  let taskHandlerCb; // Default callback after performing task sucessfully.
  let timeOffsetInMiliseconds;
  let delayInMiliseconds;
  switch (taskType) {

    case taskConstructor.CONNECT :
     console.log(taskConstructor.CONNECT);

      taskHandlerCb = ( _ => null ); // Do Nothing
      taskHandler(gameManager.handleConnectAction, [userId], task, taskConstructor.CONNECT, taskHandlerCb);
      break;
    case taskConstructor.JOIN :
      taskHandlerCb = (board, user) => {
        if (board.isBoardFull) {
          /* This offset is required to take into account the time that has passed
             since the insertion of the stepsStartTime on the DB and the time
             that the timer is spawned.
            */
          timeOffsetInMiliseconds = (new Date().getTime()) - board.stepInfo.stepsStartTime[board.stepInfo.currentStep];
          delayInMiliseconds = gameSteps.stepDuration(board.stepInfo.currentStep) - timeOffsetInMiliseconds;
          taskManager.enqueueTask(taskConstructor.createTimerTask(board._id, board.stepInfo.currentStep), delayInMiliseconds);
        }
        /* As the socket.io-emmiter canoot perform a remote join,
           we are requesting the user to join the room as follows:
                   join:room:request             join:room
           server --------------------> user ----------------> server
         */

        io.to(user.socketId).emit("join:room:request", board._id.toString());
        /* Notify all users of the room of of a new user */
        io.to(board._id.toString()).emit('user:join', "User XXX has joined the room");
      }
      taskHandler(gameManager.handleJoinAction, [userId], task, taskConstructor.JOIN, taskHandlerCb);
      break;
    case taskConstructor.LEAVE :
     taskHandlerCb = (board, user) => {
       if (board) {
         io.to(board._id.toString()).emit('leave:room', "User XXX has left the room");
       }
       io.to(user.socketId).emit('leave:room', "You has just left the room");
     };
     taskHandler(gameManager.handleLeaveAction, [userId], task, taskConstructor.LEAVE, taskHandlerCb);
     break;
     case taskConstructor.ADD_TOPIC :
      taskHandlerCb = (board, user) => {
        if (board) {
          taskManager.setTaskReady(taskConstructor.createTimerTask(board._id, gameSteps.WAITING_FOR_TOPIC));
          io.to(board._id.toString()).emit('notif:topic', `User ${user.name} has provided a topic`);
        }
      };
      taskHandler(gameManager.handleAddTopicAction, [userId, topic, timeStamp], task, taskConstructor.ADD_TOPIC, taskHandlerCb);
     break;
     case taskConstructor.ADD_POV :
      taskHandlerCb = (board, user) => {
        if (board) {
          io.to(board._id.toString()).emit('notif:pov', `User ${user.name} has added his POV`);
          if (board.numberPlayers === board.povsInfo.povsNumber) {
            taskManager.setTaskReady(taskConstructor.createTimerTask(board._id, gameSteps.WAITING_FOR_POINT_OF_VIEWS));
          }
        }
        //io.to(user.socketId).emit('leave:room', "You has just left the room");
      };
      taskHandler(gameManager.handleAddPOVAction, [userId, pov, timeStamp], task, taskConstructor.ADD_POV, taskHandlerCb);
      break;
    case taskConstructor.DOWNVOTE :
       taskHandlerCb = (board, user) => {
         /*
         if (board) {
           io.to(board._id.toString()).emit('leave:room', "User XXX has left the room");
         }
         io.to(user.socketId).emit('leave:room', "You has just left the room");
         */
       };
       taskHandler(gameManager.handleDownvoteAction, [userId, playerDownvoted], task, taskConstructor.DOWNVOTE, taskHandlerCb);
    break;
    case taskConstructor.TIMER :
      taskHandlerCb = (board, user) => {
        if (board) {
          /* This offset is required to take into account the time that has passed
             since the insertion of the stepsStartTime on the DB and the time
             that the timer is spawned.
            */
          timeOffsetInMiliseconds = (new Date().getTime()) - board.stepInfo.stepsStartTime[board.stepInfo.currentStep];
          delayInMiliseconds = gameSteps.stepDuration(board.stepInfo.currentStep) - timeOffsetInMiliseconds;
          taskManager.enqueueTask(taskConstructor.createTimerTask(board._id, board.stepInfo.currentStep), delayInMiliseconds);
          io.to(board._id).emit(`timer:${board.stepInfo.currentStep}:started`, `Time for ${board.stepInfo.currentStep.toUpperCase()} has just started`)
        }
      }
      taskHandler(gameManager.handleUpdateBoardAction, [boardId], task, taskConstructor.TIMER, taskHandlerCb);
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
};

cleanData();
taskProcessor();

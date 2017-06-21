const taskManager = require('../managers/task-manager/task-manager.js')();
var io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
const taskConstructor = require('../managers/task-manager/task-constructor.js');
const gameManager = require('../managers/game-manager/game-manager.js');
const mongoose = require('../db/mongoose.js');


function taskSwitcher (task) {
  taskObject = JSON.parse(task[1]);
  taskType = taskConstructor.getTaskProperty(taskObject, 'type')
  switch (taskType) {
    case taskConstructor.JOIN :
      taskUserId = taskConstructor.getTaskProperty(taskObject, 'userId')
      gameManager.handleJoinAction(taskUserId)
      .then (_ => console.log("Action JOIN successfully performed !"))
      .catch (e => console.log(`Action JOIN failed: ${e}`))
      io.to(taskUserId.replace(/['"]+/g, '')).emit('test', 'TOMAaaaaaaaa');
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

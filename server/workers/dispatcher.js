const taskManager = require('../managers/task-manager/task-manager.js')();

/* Move tasks to a QUEUE to be executed */
taskManager.dispatchTasksReadyToBeExecuted();

/* Imports */
const redis = require("redis");
const bluebird = require("bluebird");
const customErrors = require('../../errors/custom-errors.js');
const NoReadyTasks = customErrors.NoReadyTasks;
const redisClient = redis.createClient();
const clientBlocking = redisClient.duplicate();

/* Private functions */
function getTimeInSeconds() {
  return Math.ceil((new Date().getTime()) / 1000);
}

function selectReadyTasks (upperTimeBound) {
  return redisClient.zrangebyscoreAsync(this.redisSortedSetName, 0, upperTimeBound)
}

function removeReadyTasks (upperTimeBound) {
  return redisClient.zremrangebyscoreAsync(this.redisSortedSetName, 0, upperTimeBound)
}

/* Adds task(s) to a list */
function enqueueInternal (tasks) {
  console.log(tasks);
  return redisClient.lpushAsync(this.redisWaitingListName, tasks);
}


/* Get all tasks from a list */
function getAllTasksFromList (listName) {
  return redisClient.lrangeAsync(listName, 0, -1);
}


/* Retry a single task if and only if it has timed out,
otherwise do nothing!
*/
function retryTimedOutTask (processingTask) {
  var taskStatePromise = redisClient.getAsync(`timeout:${processingTask}`);

  return taskStatePromise.then (taskState => {
    /* If processing task state is null then it has timed out,
    so we have to:
    - [1] Retry the task by pushing it into the waiting queue again;
    - [2] Remove task from processing queue.
    */
    //console.log("STATE" + taskState);
    if (!taskState) {
      var retryTaskPromise = redisClient.rpushAsync(this.redisWaitingListName, processingTask);
      var removeTaskPromise = redisClient.lremAsync(this.redisProcessingListName, 1, processingTask);
      return Promise.all([retryTaskPromise, removeTaskPromise]);
    }
    return "DUMMY"; // Do nothing
  })
}

/* Apply retryTimedOutTask to a list of processing tasks */
function retryTimedOutTasks(processingTasks) {

  var retryTimedOutTasksPromiseArray = [];
  processingTasks.forEach (processingTask => {
    retryTimedOutTasksPromiseArray.push(this.retryTimedOutTask(processingTask));
  });

  return Promise.all(retryTimedOutTasksPromiseArray)

}


// Constructor
function TaskManager() {
  //this.redis = redis;
  //this.redisClient = redis.createClient();
  this.redisSortedSetName = "tasks-set";
  this.redisWaitingListName = "waiting-tasks-list";
  this.redisProcessingListName = "processing-tasks-list";
  this.redisProfilingListName = "profiling-tasks-list";
  this.pollingInterval = 500;
  this.taskTimeout = 3;
  this.getTimeInSeconds = getTimeInSeconds;
  this.removeReadyTasks = removeReadyTasks.bind(this);
  this.enqueueInternal = enqueueInternal.bind(this);
  this.selectReadyTasks = selectReadyTasks.bind(this);
  this.retryTimedOutTask = retryTimedOutTask.bind(this);
  this.retryTimedOutTasks = retryTimedOutTasks.bind(this);
  this.getAllTasksFromList = getAllTasksFromList.bind(this);

  /* Promisify redis functions */
  bluebird.promisifyAll(redis.RedisClient.prototype);
  bluebird.promisifyAll(redis.Multi.prototype);

  /* Error Handling */
  redisClient.on('error', function (err) {
    switch (err.code) {
      case 'ECONNREFUSED' :
      console.log(`Error type: ${err.code}`);
      console.log(`Reason: Redis Server is down !`);
      break;
      default:
      console.log(`Error type: ${err}`);
    }
  });

}

module.exports = function createTaskManager() {
  return new TaskManager();
}

/* Add a task to a sorted set */
TaskManager.prototype.enqueueTask = function (task, delayInSeconds) {
  return redisClient.zaddAsync(this.redisSortedSetName, this.getTimeInSeconds() + delayInSeconds, JSON.stringify(task))
}

/* Dequeue a task from a list */
TaskManager.prototype.dequeueTask = function () {

  /* Return task from the waiting queue but at the same time push a copy
  to the processing queue in order to resume task if the worker
  processing that task crashes before finishing it
  */
  let getTaskPromise = clientBlocking.brpoplpushAsync(this.redisWaitingListName, this.redisProcessingListName, 0);
  let setTaskTimoutPromise = getTaskPromise.then(task => redisClient.setexAsync(`timeout:${task}`, this.taskTimeout, `timeout:${task}`));
  //let setTaskTimestampPromise = getTaskPromise.then(task => redisClient.lpushAsync(this.redisProfilingListName, `${timestamp}:${task}`));

  return Promise.all([getTaskPromise, setTaskTimoutPromise])
  /* We are just returning the task identifier */
  .then(promisesResult => {return promisesResult[0]})
}


/* Marks task as completed */
TaskManager.prototype.markTaskAsCompleted = function (extendedTask, finalTime) {
  var initialTime = extendedTask.split('#')[0];
  var task = extendedTask.split('#')[1];
  var taskProcessingTime = finalTime - parseInt(initialTime);
  //console.log("Mark: " + task);
  //console.log("Processing Time: " + taskProcessingTime);
  return redisClient.lpushAsync(this.redisProfilingListName, taskProcessingTime)
  .then(_ => redisClient.lremAsync(this.redisProcessingListName, 1, task));
}

TaskManager.prototype.dispatchTasksReadyToBeExecuted = function () {

  let currentTimeInSeconds = this.getTimeInSeconds();
  this.getAllTasksFromList(this.redisProcessingListName)
  .then (processingTasks => {return this.retryTimedOutTasks(processingTasks)})
  .then (res => { return this.selectReadyTasks(currentTimeInSeconds)})
  .then (tasks => { if (tasks.length === 0) throw new NoReadyTasks(); return tasks})
  .then (tasks => this.enqueueInternal(tasks))
  .then (_ => this.removeReadyTasks(currentTimeInSeconds))
  .then (numberOfRemovedTasks => console.log("Number of ready tasks: " + numberOfRemovedTasks))
  .catch (err => { if (!(err instanceof NoReadyTasks)) throw err} )
  .then (_ => setTimeout(this.dispatchTasksReadyToBeExecuted.bind(this), this.pollingInterval))
  .catch (err => console.log(`Error while setting a new timeout for polling ready tasks: ${err.message}`))
}

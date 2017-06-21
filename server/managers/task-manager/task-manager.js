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
  return redisClient.lpushAsync(this.redisListName, tasks);
}

// Constructor
function TaskManager() {
  //this.redis = redis;
  //this.redisClient = redis.createClient();
  this.redisSortedSetName = "tasks-set";
  this.redisListName = "tasks-list";
  this.pollingInterval = 500;
  this.getTimeInSeconds = getTimeInSeconds;
  this.removeReadyTasks = removeReadyTasks.bind(this);
  this.enqueueInternal = enqueueInternal.bind(this);
  this.selectReadyTasks = selectReadyTasks.bind(this);

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
  //console.log('DEQUEUETASK')
  return clientBlocking.brpopAsync(this.redisListName, 5);
}

TaskManager.prototype.dispatchTasksReadyToBeExecuted = function () {
  //console.log("pRT")
  let currentTimeInSeconds = this.getTimeInSeconds();
  this.selectReadyTasks(currentTimeInSeconds)
  .then (tasks => {if (tasks.length === 0) throw new NoReadyTasks(); return tasks})
  .then (tasks => this.enqueueInternal(tasks))
  .then (_ => this.removeReadyTasks(currentTimeInSeconds))
  .then (numberOfRemovedTasks => console.log(numberOfRemovedTasks))
  .catch (err => { if (!(err instanceof NoReadyTasks)) throw err} )
  .then (_ => setTimeout(this.dispatchTasksReadyToBeExecuted.bind(this), this.pollingInterval))
  .catch (err => console.log(`Error while setting a new timeout for polling ready tasks: ${err.message}`))
}

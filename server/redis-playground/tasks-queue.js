/* Imports */
const redis = require("redis");
const bluebird = require("bluebird");
const redisClient = redis.createClient();



// Constructor
function TasksQueue(redisClient) {

  this.redisClient = redisClient;
  this.tasksBrokerName = "tasks-set";
  this.pollingInterval = 500;
  this.getTimeInSeconds = function () {
    return Math.ceil((new Date().getTime()) / 1000);
  }

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
          console.log(`Error type: ${err.code}`);
      }
  });

}

module.exports = function createTasksQueue(redisClient) {
  return new TasksQueue(redisClient);
}


TasksQueue.prototype.addTask = function (task, delayInSeconds) {
  return redisClient.zaddAsync(this.taskBrokerName, this.getTimeInSeconds() + delayInSeconds, JSON.stringify(task))
}

TasksQueue.prototype.removeTask = function (task) {
  return redisClient.zremAsync(this.taskBrokerName, task)
  //.catch (err => console.log(`Error while removing ${task}`))
}

TasksQueue.prototype.removeReadyTasks = function (upperTimeBound) {
  return redisClient.zremrangebyscoreAsync(this.taskBrokerName, 0, upperTimeBound)
}

TasksQueue.prototype.processReadyTasks = function () {
  let timeInSeconds = this.getTimeInSeconds();
  
  //.then (tasks => Promise.all[tasks.forEach(task => removeTask(task))])
  .then (_ => removeReadyTasks(timeInSeconds) )
  .then (numberOfRemovedTasks => console.log(numberOfRemovedTasks))
  .then (_ => setTimeout(processReadyTasks, this.pollingInterval))
  .catch (err => console.log(`Error while processing ready tasks`))
}


//processReadyTasks();

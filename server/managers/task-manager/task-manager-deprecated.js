const redis = require("redis");
const bluebird = require("bluebird");
const redisClient = redis.createClient();

const TaskBroker = require('./task-broker.js')(redis);
//const TaskManager = TaskBroker(redis);

/*
TaskManager.enqueue("task1", 60);
TaskManager.enqueue("task2", 40);
TaskManager.enqueue("task3", 20);
TaskManager.enqueue("task4", 10);
*/
module.exports = {
  processReadyTasks: TaskBroker.processReadyTasks,
  queue : TaskBroker.queue,
  unqueue : TaskBroker.unqueue
}

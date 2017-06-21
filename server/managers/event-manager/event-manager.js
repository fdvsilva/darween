const taskManager = require('../task-manager/task-manager.js')();
const taskConstructor = require('../task-manager/task-constructor.js');

const eventManager = (io) => {

  io.on('connection', (socket) => {
    console.log("New User Connected");

    socket.on("join", (message) => {
      taskManager.enqueueTask(taskConstructor.createJoinTask(socket.id), 0);
    });

    socket.on("leave", (message) => {
      console.log(`${socket.id}: ${message}`);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id}: User was disconnected`);
    });
  })


}

module.exports = eventManager;

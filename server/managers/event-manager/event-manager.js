const taskManager = require('../task-manager/task-manager.js')();
const taskConstructor = require('../task-manager/task-constructor.js');

const eventManager = (io) => {

  io.on('connection', (socket) => {
    //console.log(io);
    console.log("New User Connected");
      taskManager.enqueueTask(taskConstructor.createConnectTask(socket.id), 0);

    socket.on("join", (message) => {
      taskManager.enqueueTask(taskConstructor.createJoinTask(socket.id), 0);
    });

    socket.on("join:channel", (room) => {
      console.log(`User ${socket.id} joined room ${room}`)
      socket.join(room);
    });

    socket.on("leave", (message) => {
      taskManager.enqueueTask(taskConstructor.createLeaveTask(socket.id), 0);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id}: User was disconnected`);
      taskManager.enqueueTask(taskConstructor.createDisconnectTask(socket.id), 0);
    });
  })


}

module.exports = eventManager;

const taskManager = require('../task-manager/task-manager.js')();
const taskConstructor = require('../task-manager/task-constructor.js');

const eventManager = (io) => {

  io.on('connection', (socket) => {
    io.of('/').adapter.allRooms((err, rooms) => {
      console.log(`rooms: ${rooms}`); // an array containing all rooms (accross every node)
    });
    console.log("New User Connected");
      taskManager.enqueueTask(taskConstructor.createConnectTask(socket.id), 0);

    socket.on("join", (message) => {
      taskManager.enqueueTask(taskConstructor.createJoinTask(socket.id), 0);
    });

    socket.on("join:room", (room) => {
      //console.log(`User ${socket.id} joined room ${room}`)
      //socket.join(room);
      io.of('/').adapter.remoteJoin(socket.id, room, (err) => {
          if (err) { /* unknown id */ }
          console.log(`User ${socket.id} joined room ${room}`)
      });
    });


    socket.on("leave", (message) => {
      taskManager.enqueueTask(taskConstructor.createLeaveTask(socket.id), 0);
    });

    socket.on("pov:add", (message) => {
      console.log("POV:ADD")
      taskManager.enqueueTask(taskConstructor.createAddPOVTask(socket.id, message.pov, message.timeStamp), 0);
    });

    socket.on("topic:add", (message) => {
      console.log("TOPIC:ADD")
      taskManager.enqueueTask(taskConstructor.createAddTopicTask(socket.id, message.topic, message.timeStamp), 0);
    });

    socket.on("downvote", (message) => {
      console.log("DOWNVOTE")
      taskManager.enqueueTask(taskConstructor.createDownvoteTask(socket.id, message.playerDownvoted), 0);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id}: User was disconnected`);
      taskManager.enqueueTask(taskConstructor.createDisconnectTask(socket.id), 0);
    });
  })


}

module.exports = eventManager;

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3002;
const server = http.createServer(app);
const io = socketIO.listen(server);
var redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));

io.sockets.on('connection', function(socket) {
  //socket.emit('data', 'lollll');
  socket.on("join", message => console.log(message));
  
  console.log("buuuu")
});

io.sockets.on("test", message => console.log("1: " + message));

server.listen(port, () => {
  console.log(`Server up and listening on port ${3002}`);
})

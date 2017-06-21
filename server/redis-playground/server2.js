const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3003;
const server = http.createServer(app);
const io = socketIO.listen(server);
//var redis = require('socket.io-redis');
//io.adapter(redis({ host: 'localhost', port: 6379 }));


io.emit('test', 'TESTIIIIIIING');



io.sockets.on("test", message => console.log("2: " + message));

server.listen(port, () => {
  console.log(`Server up and listening on port ${3003}`);
})

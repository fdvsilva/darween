const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var redis = require('socket.io-redis');

const app = express();
const port = process.env.NODE_PORT || 12346;
const server = http.createServer(app);
const io = socketIO(server);
io.adapter(redis({ host: 'localhost', port: 6379 }));
const eventManager = require('./managers/event-manager/event-manager.js')(io);
//const GameManager = require('./managers/game-manager/game_manager.js')(io);





server.listen(port, () => {
  console.log(`Server up and listening on port ${process.env.NODE_PORT}`);
})

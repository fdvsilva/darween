const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var PlayerSchema = mongoose.Schema({
  socketId: {
    type: String
  },
  /*
  boardId: {
    type: Number
  },
  */
  name : {
    type: String
  }
})

var Player = mongoose.model('Player', PlayerSchema);


module.exports = Player;

/*
var player = new Player({
  socketId: 123,
  boardId: 123,
  name: 'Blue'
});

player.save().then((doc) => {
  console.log("Player successfully saved", doc)

}, (e) => console.log('Error saving pplayer'));
*/

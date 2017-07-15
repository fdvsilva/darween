const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var PlayerSchema = mongoose.Schema({
  socketId: {
    type: String
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  name : {
    type: String,
    default: ""
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

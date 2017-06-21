//______ Module Header


/* External imports */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
//var sizeof = require('object-sizeof');

/* Internal imports */
const Player = require('./player.js');

/* Internal constants */
const boardCyclicStages = [
                     'WAITING_FOR_TOPIC',
                     'WAITING_FOR_POINT_OF_VIEWS',
                     'WAITING_FOR_READING_POINT_OF_VIEWS'
                    ];
const boardInitialStage = 'WAITING_FOR_PLAYERS'


//______ Module Body


var BoardSchema = new Schema({
  stage : {
    type: String,
    enum: [ ...boardCyclicStages, boardInitialStage],
    default: boardInitialStage
  },
  currentStageTimer : {
    type: Schema.Types.Mixed,
  },
  players : {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Player'
    }]
  },
});


var Board = mongoose.model('Board', BoardSchema);

module.exports = Board;

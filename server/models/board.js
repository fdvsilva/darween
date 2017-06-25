//______ Module Header


/* External imports */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
//var sizeof = require('object-sizeof');

/* Internal imports */
const Player = require('./player.js');
const gameSteps = require('../managers/game-manager/steps/game-steps.js');

/* Internal constants */
const boardCyclicStages = [
                     gameSteps.WAITING_FOR_TOPIC,
                     gameSteps.WAITING_FOR_POINT_OF_VIEWS,
                     gameSteps.WAITING_FOR_READING_POINT_OF_VIEWS
                    ];
const boardInitialStage = gameSteps.WAITING_FOR_PLAYERS


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
  isBoardFull : {
    type: Boolean,
    default: false
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

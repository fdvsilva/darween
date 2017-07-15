//______ Module Header


/* External imports */
const customErrors = require('../errors/custom-errors.js');
const TimerTimedOut = customErrors.TimerTimedOut;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
//var sizeof = require('object-sizeof');

/* Internal imports */
const gameSteps = require('../managers/game-manager/steps/game-steps.js');

/* Internal constants */

/* Players' name should always be written in lowercase */
const playersNames = ["blue", "red", "green", "yellow", "orange", "black", "brown", "purple"];


//______ Module Body




var schemaObject = {
  stepInfo: {
    stepsStartTime : {

    },
    currentStep : {
      type: String,
      enum: gameSteps.allGameSteps,
      default: gameSteps.initialStep()
    }
    /*,
    currentStepDuration : {
      type: Number,
      default: gameSteps.initialStepDuration()
    }
    */
  },
  roundNumber : {
    type: Number,
    default: 1
  },
  isBoardFull : {
    type: Boolean,
    default: false
  },
  players : {

  },
  playersNumber: {
    type: Number,
    default: 0
  },
  playersDownvote: {

  },
  playerForTopic: {
    name : {
      type: String,
      default: playersNames[0]
    },
    id : {
      type: Number,
      default: 0
    }
  },
  topic : {
    type: String,
    default: ""
  },
  povsInfo : {
    povs: {

    },
    povsNumber : {
      type: Number,
      default: 0
    }
  }
}

/* Adds fields dynamically for the start time of the game steps */
for (i=0; i < gameSteps.iterableGameSteps.length; i++) {
  schemaObject['stepInfo']['stepsStartTime'][gameSteps.iterableGameSteps[i]] = {
    type: Number,
    default: new Date("1970").getTime()
  }
}


/* Adds fields dynamically for the state of ech user */
for (i=0; i< playersNames.length; i++) {
  schemaObject['players'][playersNames[i]] = {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    default: null
  }
}

/* Adds fields dynamically for the pov of ech user */
for (i=0; i< playersNames.length; i++) {
  schemaObject['povsInfo']['povs'][playersNames[i]] = {
    type: String,
    default: ""
  }
}

/* Adds fields dinamically for each player's downvote */
for (i=0; i< playersNames.length; i++) {
  schemaObject['playersDownvote'][playersNames[i]] = {
    type: String,
    default: ""
  }
}


var BoardSchema = new Schema(schemaObject);

BoardSchema.methods.nextPlayerName = function() {
  return playersNames[this.playersNumber];
};

BoardSchema.methods.nextPlayerForTopic = function() {
  let nextPlayerData = null;
  for (i = 0; i < playersNames.length; i++) {
    let nextPlayerNameId = ((this.playerForTopic.id + (i + 1)) % playersNames.length)
    let nextPlayerName = playersNames[nextPlayerNameId];
    if (this.players[nextPlayerName]) {
      return {'id': nextPlayerNameId, 'name': nextPlayerName};
    }
  }
};


var Board = mongoose.model('Board', BoardSchema);

//console.log(BoardSchema.methods)

module.exports = Board;

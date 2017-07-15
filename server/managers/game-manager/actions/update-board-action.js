//const Player = require('../../../models/player.js');
const Board = require('../../../models/board.js');
const gameSteps = require('../steps/game-steps.js');
const mongoose = require('../../../db/mongoose.js');
//const customErrors = require('../../../errors/custom-errors.js');
//const AlreadyInABoard = customErrors.AlreadyInABoard;

  const handleUpdateBoardAction = (boardId) => {
    //console.log(gameSteps.allGameSteps);
    /* Updates round number */
    return Board.findOne({_id: boardId})
           .then (board => {
                    if (board) {

                      board.stepInfo.currentStep = gameSteps.nextStep(board.stepInfo.currentStep);
                      board.stepInfo.stepsStartTime[board.stepInfo.currentStep] = new Date().getTime();
                      switch (board.stepInfo.currentStep) {
                        case gameSteps.WAITING_FOR_TOPIC :
                              //let playerForTopicData = board.nextPlayerForTopic();
                              board.roundNumber++;
                              board.topic = "";
                              console.log("TOPIC");
                              console.log(board.nextPlayerForTopic());
                              board.playerForTopic = board.nextPlayerForTopic();
                              console.log(board.playerForTopic);


                        break;
                        case gameSteps.WAITING_FOR_POINT_OF_VIEWS :
                              board.povsInfo.povsNumber = 0;
                        break;
                      }
                      return Promise.all([board.save(), Promise.resolve(null)])
                  }
                  return Promise.all([Promise.resolve(null), Promise.resolve(null)])
            })
  }


module.exports = handleUpdateBoardAction;

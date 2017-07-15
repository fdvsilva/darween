const WAITING_FOR_PLAYERS = 'WAITING_FOR_PLAYERS';
const WAITING_FOR_TOPIC = 'topic';
const WAITING_FOR_POINT_OF_VIEWS = 'pov';
const WAITING_FOR_READING_POINT_OF_VIEWS = 'reading';

const allGameSteps = [
  WAITING_FOR_PLAYERS,
  WAITING_FOR_TOPIC,
  WAITING_FOR_POINT_OF_VIEWS,
  WAITING_FOR_READING_POINT_OF_VIEWS
];

const iterableGameSteps = [allGameSteps[1], allGameSteps[2], allGameSteps[3]];

/*
   This buffer time takes into account the time a message sent by the client
   takes to get into the server, i.e., if the message was sent within the
   underlying time frame(gameStepsDuration[WAITING_FOR_POINT_OF_VIEWS]) and
   as long as it does not take longer than 3000ms, then it will be acknowleged
   by the server.
 */
const waitingForTopicBuffer = 3000;

/* Each duration (in miliseconds) maps to the steps found in iterableGameSteps */
const gameStepsDuration = [
  30000 + waitingForTopicBuffer,    // WAITING_FOR_TOPIC
  10000,                            // WAITING_FOR_POINT_OF_VIEWS
  10000,                            // WAITING_FOR_READING_POINT_OF_VIEWS
]

function initialStep() {
  return iterableGameSteps[0];
}

function initialStepDuration() {
  return gameStepsDuration[0];
}

function nextStep(currentStep) {
  return iterableGameSteps[(iterableGameSteps.indexOf(currentStep) + 1) % iterableGameSteps.length ];
}

function stepDuration(step) {
  return gameStepsDuration[iterableGameSteps.indexOf(step)];
}

function nextStepDuration(currentStep) {
  return gameStepsDuration[(iterableGameSteps.indexOf(currentStep) + 1) % iterableGameSteps.length ];
}

module.exports = {
  WAITING_FOR_PLAYERS,
  WAITING_FOR_TOPIC,
  WAITING_FOR_POINT_OF_VIEWS,
  WAITING_FOR_READING_POINT_OF_VIEWS,
  initialStep,
  nextStep,
  stepDuration,
  nextStepDuration,
  initialStepDuration,
  iterableGameSteps,
  allGameSteps
}

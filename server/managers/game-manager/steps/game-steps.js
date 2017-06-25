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

/* Each time (in seconds) maps to the steps found in iterableGameSteps */
const gameStepsTime = [
  10,   // WAITING_FOR_TOPIC
  10, // WAITING_FOR_POINT_OF_VIEWS
  10, // WAITING_FOR_READING_POINT_OF_VIEWS
]

function initialStep() {
  return iterableGameSteps[0];
}

function initialStepTime() {
  return gameStepsTime[0];
}

function nextStep(currentStep) {
  return iterableGameSteps[(iterableGameSteps.indexOf(currentStep) + 1) % iterableGameSteps.length ];
}

function nextStepTime(currentStep) {
  return gameStepsTime[ (iterableGameSteps.indexOf(currentStep) + 1) % iterableGameSteps.length ];
}

module.exports = {
  WAITING_FOR_PLAYERS,
  WAITING_FOR_TOPIC,
  WAITING_FOR_POINT_OF_VIEWS,
  WAITING_FOR_READING_POINT_OF_VIEWS,
  initialStep,
  nextStep,
  nextStepTime,
  initialStepTime
}

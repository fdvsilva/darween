import React from 'react';
import Face from './face.js';
import FontAwesome from 'react-fontawesome';
import {PropTypes} from 'prop-types';

const MainDisplay = (props) => {
    return (
      <div className="main-display">
        <h1 className="secondary-info">  <FontAwesome className="display-icon" name='commenting-o' /> {props.topic} </h1>
        <h1 className="primary-info"> <FontAwesome className="display-icon" name='clock-o' /> {props.duration} </h1>
        <h1 className="secondary-info"> <FontAwesome className="display-icon" name='hourglass-start' /> {props.gameStatusMessage}</h1>
      </div>
    );
}

MainDisplay.propTypes = {
  topic: PropTypes.string,
  duration: PropTypes.string,
  gameStatusMessage: PropTypes.string,
}


MainDisplay.defaultProps = {
  topic: "To be decided ..." ,
  duration: "0:00",
  gameStatusMessage:  'Waiting for players',
}

export default MainDisplay;

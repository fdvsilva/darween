import React from 'react';
import Face from './face.js';
import FontAwesome from 'react-fontawesome';

const MainDisplay = () => {
    return (
      <div className="main-display">
        <h1 className="secondary-info">  <FontAwesome className="display-icon" name='commenting-o' /> Religion </h1>
        <h1 className="primary-info"> <FontAwesome className="display-icon" name='clock-o' /> 3:00 </h1>
        <h1 className="secondary-info"> <FontAwesome className="display-icon" name='hourglass-start' /> Awaiting POVs</h1>
      </div>
    );
}

export default MainDisplay;

import React, { Component } from 'react';

import FacesGrid from './faces_grid.js';
import ScrollDownMarker from './scroll_down_marker.js';
import SpeechBalloon from './speech_balloon.js';

var classNames = require('classnames');

const Tile = (props) => {
  let facePicsNames = [
    ["face3.jpg", "face8.jpg", "face2.jpg", "face4.jpg", "face5.jpg"],
    ["face6.jpg", "face7.jpg", "face1.jpg", "face9.jpg", "face10.jpg"]
  ];

  let tileClasses = classNames({
      'main-tile': true,
      'skew-areas': props.skewAreasP
    });

  let tileStyles = {
      background: props.background,
      height: props.height
    };

  return (
    <div>
      { props.displayScrollDownMarkerP &&  <ScrollDownMarker/> }
        <div style={tileStyles} className={tileClasses}>
          <FacesGrid
            numberRows={facePicsNames.length}
            facePicsNames={facePicsNames}
          />
          <SpeechBalloon message={props.message} />
        </div>
    </div>
  );
}

export default Tile;

import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const ScrollDownMarker = (props) => {

  /*
  let sdMarkerStyles = {
      animationName: props.animationName,
    };
  */

    return (
      <div className="sd-marks-container">
        <FontAwesome className="scroll-down-mark scroll-down-mark-top" name='angle-double-down' />
        <FontAwesome className="scroll-down-mark" name='angle-double-down' />
      </div>
    );
}

export default ScrollDownMarker;

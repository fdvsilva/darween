import React, { Component } from 'react';

const SpeechBalloon = (props) => {
    return (
      <h1 className="balloon-message">
        {props.message}
      </h1>
    );
}

export default SpeechBalloon;

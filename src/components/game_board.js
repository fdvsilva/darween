import React, { Component } from 'react';
import AccordionMessages from './accordion_messages.js';

const GameBoard = () => {
    return (
      <div className="board">
        <div className="board-players"> </div>
        <div className="board-messages">
          <AccordionMessages />
        </div>
      </div>
    );
}

export default GameBoard;

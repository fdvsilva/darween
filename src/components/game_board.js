import React, { Component } from 'react';
import AccordionMessages from './accordion_messages.js';
import MainDisplay from './main_display.js';
import NewsFeed from './news_feed.js';
import SpeechBalloon from './speech_balloon.js'

const GameBoard = () => {
    return (
      <div className="board">
        <div className="board-players">


          <MainDisplay />
          <NewsFeed />
        </div>
        <div className="board-messages">
          <AccordionMessages />
        </div>
      </div>
    );
}

export default GameBoard;

import React, { Component } from 'react';

import AccordionMessages from './accordion_messages.js';
import MainDisplay from './main_display.js';
import NewsFeed from './news_feed.js';
import SpeechBalloon from './speech_balloon.js'
import Player from './player.js';
import BoardStats from './board_stats.js';

const GameBoard = () => {
  return (
    <div className="board">
      <div className="board-misc">
        <MainDisplay />
        <NewsFeed />
        {/*
          <div className="board-dashboard">
          <BoardStats className="board-stats"/>
          </div>
          */}
          <div>
            <div className="board-players">
              <Player className="board-player" />
              <Player className="board-player" />
              <Player className="board-player" />
              <Player className="board-player" />
              <Player className="board-player" />
              <Player className="board-player" />
              <Player className="board-player" />
              <Player className="board-player" />
            </div>
            <BoardStats className="board-stats"/>
          </div>
        </div>
        <div className="board-menu">
          <AccordionMessages />
        </div>
      </div>
    );
  }

  export default GameBoard;

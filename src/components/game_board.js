import React, { Component } from 'react';

import AccordionDisplay from './accordion_display.js';
import MainDisplay from './main_display.js';
import NewsFeed from './news_feed.js';
import SpeechBalloon from './speech_balloon.js'
import Player from './player.js';
import BoardStats from './board_stats.js'
import { playersInfo, playersInfoDarkColors, topicsData, playersData,
         notificationsData, downvotesData, newsData } from './fake_state';




function builPlayers(playersData) {
  let players = [];
  for (var i=0; i< playersData.length; i++) {
    players.push(<Player
      className="board-player"
      name={playersData[i].downvotes}
      read={playersData[i].read}
      pov={playersData[i].pov}
      color={playersData[i].color}
      key={i}
      />);
  }
  return players
}





const GameBoard = () => {


    return (
      <div className="board">
        <div className="board-misc">
          <MainDisplay />
          <NewsFeed news={newsData}/>
          {/*
            <div className="board-dashboard">
            <BoardStats className="board-stats"/>
            </div>
            */}
            <div>
              <div className="board-players">
                {builPlayers(playersData)}
              </div>
              <BoardStats className="board-stats"/>
            </div>
          </div>
          <div className="board-menu">
            <AccordionDisplay
              topicsData={topicsData}
              downvotes={downvotesData}
              notifications={notificationsData}
              />
          </div>
        </div>
      );
    }

    export default GameBoard;

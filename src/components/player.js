import React from 'react';
import FontAwesome from 'react-fontawesome';

const Player = () => {
    return (
      <div className="board-player">


        <div className="top">
          <div className="player-info">
            <FontAwesome className="stat-icon" name='thumbs-o-down'/>
            <p> Downvotes: </p>
            <span className="stat-value"> 3 </span>
          </div>
          <div className="player-info">
            <FontAwesome className="stat-icon" name='commenting-o'/>
            <p> Topic: </p>
            <FontAwesome className="stat-value" name='check'/>
          </div>
          <div className="player-info">
            <FontAwesome className="stat-icon" name='book'/>
            <p> Read: </p>
            <FontAwesome className="stat-value" name='check'/>
          </div>
        </div>


        <div className="bottom">
          <FontAwesome className="player-icon" name='user-circle-o'/>
        </div>
      </div>
    );
}

export default Player;

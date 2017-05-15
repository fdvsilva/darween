import React from 'react';
import FontAwesome from 'react-fontawesome';

const BoardStats = () => {
  return (
    <div className="board-stats">
      <div className="stat-entry">
        <FontAwesome className="stat-icon" name='trophy'/>
        <p> Round: </p>
        <span className="stat-value"> 1 </span>
      </div>
      <div className="stat-entry">
        <FontAwesome className="stat-icon" name='clock-o'/>
        <p> Total time: </p>
        <span className="stat-value"> 0h40m </span>
      </div>
      <div className="stat-entry">
        <FontAwesome className="stat-icon" name='user-circle-o'/>
        <p> Player: </p>
        <span className="stat-value"> Blue </span>
      </div>
      <div className="stat-entry">
        <FontAwesome className="stat-icon" name='thumbs-o-down'/>
        <p> Downvote: </p>
        <span className="stat-value"> Black </span>
      </div>

      <div className="stat-entry">
        <FontAwesome className="stat-icon" name='users'/>
        <p> Users: </p>
        <span className="stat-value"> 8/8 </span>
      </div>
    </div>
  );
}

export default BoardStats;

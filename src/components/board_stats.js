import React from 'react';
import FontAwesome from 'react-fontawesome';
import {PropTypes} from 'prop-types';

const BoardStats = (props) => {
  return (
    <div className="board-stats">
      <div className="stat-entry">
        <FontAwesome className="stat-icon" name='trophy'/>
        <p> Round: </p>
        <span className="stat-value"> {props.round} </span>
      </div>
      <div className="stat-entry">
        <FontAwesome className="stat-icon" name='clock-o'/>
        <p> Total time: </p>
        <span className="stat-value"> {props.totalTime} </span>
      </div>
      <div className="stat-entry">
        <FontAwesome className="stat-icon" name='user-circle-o'/>
        <p> Player: </p>
        <span className="stat-value"> {props.playerName} </span>
      </div>
      <div className="stat-entry">
        <FontAwesome className="stat-icon" name='thumbs-o-down'/>
        <p> Downvote: </p>
        <span className="stat-value"> {props.downvote} </span>
      </div>

      <div className="stat-entry">
        <FontAwesome className="stat-icon" name='users'/>
        <p> Users: </p>
        <span className="stat-value"> 8/{props.totalUsers} </span>
      </div>
    </div>
  );
}

BoardStats.propTypes = {
  round: PropTypes.number,
  totalTime: PropTypes.string,
  playerName: PropTypes.string,
  downvote: PropTypes.string,
  totalUsers: PropTypes.number
}


BoardStats.defaultProps = {
  round: 0,
  totalTime: "0h00m",
  playerName: "Blue",
  downvote: "Not yet",
  totalUsers: 8
}

export default BoardStats;

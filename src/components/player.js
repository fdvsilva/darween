import React from 'react';
import FontAwesome from 'react-fontawesome';
import {PropTypes} from 'prop-types';

const Player = (props) => {

    let iconPOV = (props.pov) ? 'check' : 'hourglass-start';
    let iconRead = (props.read) ? 'check' : 'hourglass-start';
    let playerStyles = {
      color: props.color
    }

    return (
      <div className="board-player">


        <div className="top">
          <div className="player-info">
            <FontAwesome className="stat-icon" name='thumbs-o-down'/>
            <p> Downvotes: </p>
            <span className="stat-value"> {props.downvotes} </span>
          </div>
          <div className="player-info">
            <FontAwesome className="stat-icon" name='commenting-o'/>
            <p> POV: </p>
              <FontAwesome className="stat-value" name={iconPOV}/>
          </div>
          <div className="player-info">
            <FontAwesome className="stat-icon" name='book'/>
            <p> Read: </p>
            <FontAwesome className="stat-value" name={iconRead}/>
          </div>
        </div>


        <div className="bottom">
          <FontAwesome style={playerStyles} className="player-icon" name='user-circle-o'/>
        </div>
      </div>
    );
}

Player.propTypes = {
  downvotes: PropTypes.number,
  pov: PropTypes.bool,
  read: PropTypes.bool,
  color: PropTypes.string
}


Player.defaultProps = {
  downvotes: 0,
  pov: false,
  read: false,
  color: "hsla(195, 100%, 50%,1)"
}

export default Player;

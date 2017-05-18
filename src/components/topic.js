import React from 'react';
import {PropTypes} from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PlayerPOV from './player_pov.js';

function buildPlayersPOV(players, topicId, checkOverflowFun) {

  let playersPOV = []
  for (let i=0; i< players.length; i++) {
    //console.log("topicId: " + topicId + i);
    playersPOV.push(<PlayerPOV  name={players[i].name}
      pov={players[i].pov}
      color={players[i].color}
      checkOverflow={checkOverflowFun}
      key={i}
      id={`${topicId}${i}`}
      />);
    }
    return playersPOV;
  }


  const Topic = (props) => {
    let toggle = `players-pov-toggle${props.id}`;



    return (
      <div className="topic">
        <p className="label-text">
          <label onClick={e => props.checkOverflow()} className="left-align-topic-caret" htmlFor={toggle}>
            <FontAwesome name='caret-down'/>
          </label>
          {props.topicData.topic}
        </p>
        <input className="toggle" type="checkbox" id={toggle}/>
        <div className="players-pov">
          {buildPlayersPOV(props.topicData.playersPOV, props.id, props.checkOverflow)}
        </div>
      </div>
    );
  }

  Topic.propTypes = {
    id: PropTypes.number,
    checkOverflow: PropTypes.func,
    topicData: PropTypes.shape({
      topic: PropTypes.string,
      playersPOV: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string,
        name: PropTypes.string,
        pov: PropTypes.string
      }))
    })
  }

  Topic.defaultProps = {
    checkOverflow: () => {},
    topicData: {}
  }

  export default Topic;

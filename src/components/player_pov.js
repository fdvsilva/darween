import React from 'react';
import {PropTypes} from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';

const PlayerPOV = (props) => {

  let leftBorder = `30px 0px 0 ${props.color} inset`;

  let playerPovStyles = {
      boxShadow: `-30px 0px 0 hsla(48, 100%, 50%, 1) inset,
                    ${leftBorder}`
    };

    let toggle = `player-pov-toggle${props.id}`;

    return (
      <div style={playerPovStyles} className={classnames({"player-pov": true, 'room-for-caret': props.pov})}>
          <FontAwesome className="left-player-pov" name='user-circle-o'/>
          <span> {props.name} </span>
          {props.pov && <label onClick={e => props.checkOverflow()} className="right-player-pov" htmlFor={toggle}> <FontAwesome  name='caret-down'/>   </label>}
          <input className="toggle" type="checkbox" id={toggle}/>
          {props.pov && <p> {props.pov} </p>}
      </div>
    );
}

PlayerPOV.propTypes = {
  checkOverflow: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  pov:  PropTypes.string,
  color:  PropTypes.string
}


PlayerPOV.defaultProps = {
  name: '',
  pov:  '',
  color:  'white'
}

export default PlayerPOV;

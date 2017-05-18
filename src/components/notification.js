import React from 'react';
import {PropTypes} from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';

const Notification = (props) => {

    let toggle = `notification-${props.id}`;

    return (
      <div className={classnames({"notification": true, 'room-for-caret': props.body})}>
          <FontAwesome className="left-aligned-icon-notification" name='info-circle'/>
          <span> {props.title} </span>
          {props.body && <label onClick={e => props.checkOverflow()}
                                className="right-aligned-icon-notification"
                                htmlFor={toggle}>
            <FontAwesome  name='caret-down'/>
          </label>}
          <input className="toggle" type="checkbox" id={toggle}/>
          {props.body && <p> {props.body} </p>}
      </div>
    );
}

Notification.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  checkOverflow: PropTypes.func
}


Notification.defaultProps = {
  title: '',
  body:  '',
}

export default Notification;

import React from 'react';
import FontAwesome from 'react-fontawesome';
import {PropTypes} from 'prop-types';
var classNames = require('classnames');

const News = (props) => {

  let date = `${props.date.getHours()}:${props.date.getMinutes()}:${props.date.getSeconds()}`;

  let iconName = props.alert ? 'exclamation-circle' : 'info-circle';

  let newsClasses = classNames({"news-icon": true, "alertColor": props.alert});

    return (
      <div className="news">
        <FontAwesome className={newsClasses} name={iconName} />
        <p> {props.message} </p>
        <span className="time"> {date} </span>
      </div>
    );
}

News.propTypes = {
  alert: PropTypes.bool,
  message: PropTypes.string,
  date: PropTypes.object,
}

News.defaultProps = {
  alert: false,
  message: '' ,
  date: {}
}

export default News;

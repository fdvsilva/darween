import React from 'react';
import FontAwesome from 'react-fontawesome';

const GenericDropdown = (props) => {

  var genericDropdownStyles = {
    top: props.top,
    bottom: props.bottom,
    left: props.left,
    right: props.right,
    width: props.width,
    paddingLeft: props.paddingLeft
  };

  return (
    <div style={genericDropdownStyles} className="dropdown">
      {props.children}
    </div>
  )
}

export default GenericDropdown;

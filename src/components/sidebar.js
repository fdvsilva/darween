import React from 'react';
import FontAwesome from 'react-fontawesome';
import Logo from './logo.js';

const Sidebar = () => {
  return (
    <div>
    <input className="toggle" type="checkbox" id="sidebar-toggle"/>
    <div className="sidebar">

      <label htmlFor="sidebar-toggle">
        <FontAwesome className="" name='bars' />
      </label>
      <div className="backdrop"> </div>
      <ul className="menu">
        <li> <Logo /> </li>
        <li >
          <FontAwesome className="sidebar-icon-left" name='circle'/>
          Join Circle
        </li>
        <li>
          <FontAwesome className="sidebar-icon-left" name='circle-o'/>
          Leave Circle
        </li>
        <li className="separator">
        </li>
        <li>
          <FontAwesome className="sidebar-icon-left" name='commenting-o'/>
          Add POV
        </li>
        <li>
          <FontAwesome className="sidebar-icon-left" name='book'/>
          Skip Reading
        </li>
        <li className="expand-dropdown">
          <FontAwesome className="sidebar-icon-left" name='thumbs-o-down'/>
          Downvote
          <FontAwesome className="sidebar-icon-right" name='caret-right'/>
          <div className="dropdown">
            <p>  <FontAwesome className="dropdown-icon" name='circle'/> Blue </p>
            <p>  <FontAwesome className="dropdown-icon" name='circle'/> Blue </p>
            <p>  <FontAwesome className="dropdown-icon" name='circle'/> Blue </p>
            <p>  <FontAwesome className="dropdown-icon" name='circle'/> Blue </p>
            <p>  <FontAwesome className="dropdown-icon" name='circle'/> Blue </p>
            <p>  <FontAwesome className="dropdown-icon" name='circle'/> Blue </p>
            <p>  <FontAwesome className="dropdown-icon" name='circle'/> Blue </p>
            <p>  <FontAwesome className="dropdown-icon" name='circle'/> Blue </p>
            <hr />
            <p>  <FontAwesome className="dropdown-icon" name='circle'/> No Downvote </p>
          </div>
        </li>


      </ul>
    </div>
    </div>
  );
}

export default Sidebar;

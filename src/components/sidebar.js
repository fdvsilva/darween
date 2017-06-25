import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {PropTypes} from 'prop-types';

import Logo from './logo.js';
import GenericDropdown from './generic_dropdown.js';
//import ModalWrapper from './modal_wrapper.js';

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {modal: false};
    this.joinBoard = this.joinBoard.bind(this);
    this.leaveBoard = this.leaveBoard.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('join:channel:request', (channel => {
      console.log("join:channel:request");
      console.log(channel);
      this.props.socket.emit("join:channel", channel);
    }));

    this.props.socket.on('leave:channel', (channel => {
      console.log("LEFT CHANNEL");
    }));

    this.props.socket.on('test', (message => {
      console.log("TEST: " + message);
    }));

  }

  joinBoard () {
    this.props.socket.emit("join", "A new player has joined");
  }

  leaveBoard () {
    this.props.socket.emit("leave", "XXX Player has left");
  }

  render() {
    return (
      <div>
        <input className="toggle" type="checkbox" id="sidebar-toggle"/>
        <div className="sidebar">

          <label htmlFor="sidebar-toggle">
            <FontAwesome className="" name='bars' />
          </label>
          <ul className="menu">
            <li> <Logo /> </li>
            <li onClick = {this.joinBoard}>
              <FontAwesome className="sidebar-icon-left" name='circle'/>
              Join Circle
            </li>
            <li onClick = {this.leaveBoard}>
              <FontAwesome className="sidebar-icon-left" name='circle-o'/>
              Leave Circle
            </li>
            <li className="separator">
            </li>
            <li onClick={() => this.setState({ modal: true})}>
              <FontAwesome className="sidebar-icon-left" name='commenting-o'/>
              Add POV
              {/*<ModalWrapper show={this.state.modal}/> */}
            </li>
            <li>
              <FontAwesome className="sidebar-icon-left" name='book'/>
              Skip Reading
            </li>
            <li className="dropdownable">
              <FontAwesome className="sidebar-icon-left" name='thumbs-o-down'/>
              Downvote
              <FontAwesome className="sidebar-icon-right" name='caret-right'/>
              <GenericDropdown top="-4px" right="-181px">
                <p>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Blue </p>
                <p>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Blue </p>
                <p>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Blue </p>
                <p>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Blue </p>
                <p>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Blue </p>
                <p>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Blue </p>
                <p>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Blue </p>
                <p>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Blue </p>
                <hr />
                <p>  <FontAwesome className="dropdown-icon-relative" name='circle'/> No Downvote </p>
              </GenericDropdown>
            </li>


          </ul>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  socket: PropTypes.object
}

export default Sidebar;

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
    this.addPOV = this.addPOV.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('connect', (room => {
      console.log("CONNECTED");
    }));

    this.props.socket.on('disconnect', (room => {
      console.log("DISCONNECTED");
    }));


    this.props.socket.on('join:room:request', (room => {
      console.log("join:room:request");
      this.props.socket.emit("join:room", room);
    }));

    this.props.socket.on('leave:room', (room => {
      console.log("LEFT ROOM");
    }));

    this.props.socket.on('notif:pov', (message => {
      console.log(message);
    }));

    this.props.socket.on('notif:topic', (message => {
      console.log(message);
    }));

    this.props.socket.on('user:join', (message => {
      console.log(`[user:join] ${message}`);
    }));

    this.props.socket.on('timer:topic:finished', (message => {
      console.log("TOPIC: " + message);
    }));

    this.props.socket.on('timer:pov:finished', (message => {
      console.log("POV: " + message);
    }));

    this.props.socket.on('timer:reading:finished', (message => {
      console.log("READING: " + message);
    }));

  }

  joinBoard () {
    this.props.socket.emit("join", "A new player has joined");
  }

  leaveBoard () {
    this.props.socket.emit("leave", "XXX Player has left");
  }

  addPOV () {
    this.props.socket.emit("pov:add", {pov: "random text brrrrr !", timeStamp: new Date().getTime() });
  }

  addTopic () {
    this.props.socket.emit("topic:add", {topic: "Love", timeStamp: new Date().getTime() });
  }

  downvote (playerDownvoted) {
    this.props.socket.emit("downvote", {playerDownvoted});
    //console.log(playerName);
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
            <li onClick={this.addTopic}>
              <FontAwesome className="sidebar-icon-left" name='coffee'/>
              Add Topic
              {/*<ModalWrapper show={this.state.modal}/> */}
            </li>
            {/* <li onClick={() => this.setState({ modal: true})> */}
            <li onClick={this.addPOV}>
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
                <p onClick={() => this.downvote('blue')}>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Blue </p>
                <p onClick={() => this.downvote('red')}>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Red </p>
                <p onClick={() => this.downvote('green')}>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Green </p>
                <p onClick={() => this.downvote('yellow')}>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Yellow </p>
                <p onClick={() => this.downvote('orange')}>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Orange </p>
                <p onClick={() => this.downvote('black')}>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Black </p>
                <p onClick={() => this.downvote('brown')}>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Brown </p>
                <p onClick={() => this.downvote('purple')}>  <FontAwesome className="dropdown-icon-relative" name='circle'/> Purple </p>
                <hr />
                <p onClick={() => this.downvote('remove')}>  <FontAwesome className="dropdown-icon-relative" name='circle'/> No Downvote </p>
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

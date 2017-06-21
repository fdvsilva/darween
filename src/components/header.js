import React from 'react';
import FontAwesome from 'react-fontawesome';
import {PropTypes} from 'prop-types';

import Logo from './logo.js';
import GenericDropdown from './generic_dropdown.js';

const Header = (props) => {
  return (
    <div className="header">
      {/* <h1> Header </h1> */}
      {/*<h2 className="title"> Darween </h2>*/}
      { !props.loggedIn && <Logo /> }
      <div className="right-aligned-items">
        {
          props.loggedIn &&
          <div className="dropdownable">
            <FontAwesome className="icons" name='globe'  />
            <span className="notifs-number"> 3 </span>
            <span className="plain-text">Notifications</span>
              <GenericDropdown top="25px" left="0" width="340px">
                <p style={{paddingLeft: '30px'}}>
                  <FontAwesome className="dropdown-icon-absolute" name='info-circle'/>
                  Notification Title #1
                </p>
                <hr />
                  <p style={{paddingLeft: '30px'}}>
                    <FontAwesome className="dropdown-icon-absolute" name='info-circle'/>
                    Notification Title #2
                  </p>
                  <hr />
                    <p style={{paddingLeft: '30px'}}>
                      <FontAwesome className="dropdown-icon-absolute" name='info-circle'/>
                      Notification Title #3
                    </p>
              </GenericDropdown>
          </div>
        }
        <div className="">
          <FontAwesome className="icons " name='envelope-o'  />
          <span className="plain-text">Contact us</span>
        </div>
        <div className="">
          <FontAwesome className="icons" name='sign-in' />
          <span className="plain-text">Log in</span>
        </div>
      </div>


    </div>
  );
};

Header.propTypes = {
  loggedIn: PropTypes.bool,
};


Header.defaultProps = {
  loggedIn: false,
};

export default Header;

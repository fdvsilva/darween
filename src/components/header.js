import React from 'react';
import FontAwesome from 'react-fontawesome';

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
                <p style={{paddingLeft: "30px"}}>
                  <FontAwesome className="dropdown-icon-absolute" name='info-circle'/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation
                </p>
                <hr />
                  <p style={{paddingLeft: "30px"}}>
                    <FontAwesome className="dropdown-icon-absolute" name='info-circle'/>
                    Lorem ipsum dolor sit amet, consectetur.
                  </p>
                  <hr />
                    <p style={{paddingLeft: "30px"}}>
                      <FontAwesome className="dropdown-icon-absolute" name='info-circle'/>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation
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
}

export default Header;

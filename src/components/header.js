import React from 'react';
import FontAwesome from 'react-fontawesome';
import Logo from './logo.js';

const Header = (props) => {
  return (
    <div className="header">
      {/* <h1> Header </h1> */}
      {/*<h2 className="title"> Darween </h2>*/}
      { !props.loggedIn && <Logo /> }
      <div className="right-aligned-items">
        <div className="">
          <FontAwesome className="icons mail" name='envelope'  />
          <span className="plain-text">Contact us</span>
        </div>
        <div className="">
          <FontAwesome className="icons login" name='sign-in' />
          <span className="plain-text">Log in</span>
        </div>
      </div>


    </div>
  );
}

export default Header;

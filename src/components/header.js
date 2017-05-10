import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const Header = () => {
  return (
    <div className="header">
      {/* <h1> Header </h1> */}
      {/*<h2 className="title"> Darween </h2>*/}
      <div className="left-aligned-items">
      <div className="title-container">
        <div className="title">
          <FontAwesome className="" name='comments-o' size='2x' />
          <span className="logo-text">darween</span>
        </div>
      </div>
      </div>
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

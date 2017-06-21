import React from 'react';
import FontAwesome from 'react-fontawesome';

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo">
        <FontAwesome name='comments-o' size='2x' />
        <span className="logo-text">darween</span>
      </div>
    </div>
  );
};

export default Logo;

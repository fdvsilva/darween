import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const AccordionMessages = () => {
    return (
      <div className="accordion">
        <div className="label">
          <FontAwesome className="label-icons left" name='bell-o' />
          Notifications
          <FontAwesome className="label-icons right" name='caret-down' />
        </div>
        <div className="label">
            <FontAwesome className="label-icons left" name='commenting-o' />
          Topics
          <FontAwesome className="label-icons right" name='caret-down' />
          <div className="label-second-tier">
            <p className="label-text">
              <FontAwesome className="left" name='caret-down'/>
              Religion
              </p>
              <div className="label-third-tier">
                <div>
                  <div className="third-tier-header">
                    <FontAwesome className="left-third-tier" name='user-circle-o'/>
                    <span> Blue's</span>
                    <FontAwesome className="right-third-tier" name='caret-down'/>
                  </div>
                <p>

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                </div>
                  <div className="third-tier-header">
                    <FontAwesome className="left-third-tier" name='user-circle-o'/>
                    <span> Red's</span>
                    <FontAwesome className="right-third-tier" name='caret-down'/>
                  </div>
                  <div className="third-tier-header">
                    <FontAwesome className="left-third-tier" name='user-circle-o'/>
                    <span> Green's</span>
                    <FontAwesome className="right-third-tier" name='caret-down'/>
                  </div>
                  <div className="third-tier-header">
                    <FontAwesome className="left-third-tier" name='user-circle-o'/>
                    <span> Yellow's</span>
                    <FontAwesome className="right-third-tier" name='caret-down'/>
                  </div>
                  <div className="third-tier-header">
                    <FontAwesome className="left-third-tier" name='user-circle-o'/>
                    <span> Orange's</span>
                    <FontAwesome className="right-third-tier" name='caret-down'/>
                  </div>
                  <div className="third-tier-header">
                    <FontAwesome className="left-third-tier" name='user-circle-o'/>
                    <span> Black's</span>
                    <FontAwesome className="right-third-tier" name='caret-down'/>
                  </div>
                  <div className="third-tier-header">
                    <FontAwesome className="left-third-tier" name='user-circle-o'/>
                    <span> Brown's</span>
                    <FontAwesome className="right-third-tier" name='caret-down'/>
                  </div>
                  <div className="third-tier-header">
                    <FontAwesome className="left-third-tier" name='user-circle-o'/>
                    <span> Purples's</span>
                    <FontAwesome className="right-third-tier" name='caret-down'/>
                  </div>

              </div>


              <p className="label-text">
                <FontAwesome className="left" name='caret-down'/>
                Politics
              </p>
                <p className="label-text">
                  <FontAwesome className="left" name='caret-down'/>
                  Sex
                </p>
          </div>

        </div>
        <div className="label">
          <FontAwesome className="label-icons left" name='thumbs-o-down' />
          Downvotes
          <FontAwesome className="label-icons right" name='caret-down' />
        </div>

      </div>
    );
}

export default AccordionMessages;

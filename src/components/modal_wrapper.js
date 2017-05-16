import React from 'react';
import FontAwesome from 'react-fontawesome';

const ModalWrapper = (props) => {
  //if (!props.show) return null;

  return (
    <div className="modal-wrapper">
    <div className="modal">
    <header >
    <p>
    <FontAwesome className="header-icon" name='commenting-o' />
    POV
    </p>
    <p>
    5:32
    <FontAwesome className="header-icon" name='clock-o' />

    </p>
    </header>
    <div className="modal-body">
    <p className="info-message">
    <FontAwesome className="info-icon" name='info-circle' />
    Insert your point of view below
    </p>
    <textarea/>
    {props.children}
    <p className="letters-countdown"> 3 / 500 </p>
    </div>
    <footer>
    <a>Add</a>
    <a>Close</a>
    </footer>
    </div>

    </div>
  );
}

export default ModalWrapper;

import React from 'react';
import {PropTypes} from 'prop-types';
import FontAwesome from 'react-fontawesome';
import classnames from 'classnames';

const ModalWrapper = (props) => {
  //if (!props.show) return null;

  let modalStyles = {
      width: props.width
    };

  let modalBodyStyles = {
      height: props.height,
    };


  return (
    <div className={classnames('modal-wrapper', props.className)}>
    <div  style={modalStyles} className="modal">
    <header >
    { props.title &&
      <p>
      <FontAwesome className="header-icon" name='info-circle' />
      {props.title}
      </p>
    }
      { props.timer &&
        <p className="timer">
          5:32
          <FontAwesome className="header-icon" name='clock-o' />
        </p>
        }
    </header>

    <div style={modalBodyStyles} className="modal-body">
    { props.warningMessage &&
      <p className="body-paragraph info-message">
        <FontAwesome className="info-icon" name='info-circle' />
        Insert your point of view below
      </p>
    }

    {props.children}
    { props.maxChars !==0 && <p className={classnames({'body-paragraph': true,
                                                       'chars-countdown':true,
                                                       'chars-countdown-pushed-right': props.adjustForContactModal})}>
                                0 / {props.maxChars}
                            </p>
    }
    </div>
    <footer className={classnames({'center-buttons': props.adjustForContactModal})}>
    <a> {props.okText} </a>
    <a>Close</a>
    </footer>
    </div>

    </div>
  );
}

ModalWrapper.propTypes = {
  title : PropTypes.string,
  okText: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  onOk: PropTypes.func,
  timer: PropTypes.bool,
  warningMessage: PropTypes.string,
  maxChars: PropTypes.number,
  centerButtons: PropTypes.bool

}

ModalWrapper.defaultProps = {
  title: '',
  okText: 'OK',
  width: '600px',
  height: '250px',
  onOk: () => {},
  timer: false,
  warningMessage: '',
  maxChars: 0,
  centerButtons: false
}

export default ModalWrapper;

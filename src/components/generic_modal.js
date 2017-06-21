import React from 'react';
import {PropTypes} from 'prop-types';

import ModalWrapper from './modal_wrapper.js';

const GenericModal = (props) => {
  return (
    <ModalWrapper className="generic-modal" title={props.title}
      okText={props.okText}
      timer={props.timer}
      warningMessage={props.warningMessage}
      height={props.height}
      width={props.width}
      maxChars={props.maxChars}
      adjustForContactModal={props.adjustForContactModal}
      >
      {props.children}
    </ModalWrapper>
  );
};

export default GenericModal;


GenericModal.propTypes = {
  title: PropTypes.string,
  okText: PropTypes.bool,
  timer: PropTypes.bool,
  warningMessage: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  maxChars: PropTypes.number,
  adjustForContactModal: PropTypes.bool,
};


GenericModal.defaultProps = {

};

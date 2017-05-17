import React from 'react';

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
}

export default GenericModal;

import React from 'react';
import PropTypes from 'prop-types';

import wrapOverlay from "../../hoc/wrapOverlay/wrapOverlay";
import MainButton from "../Buttons/MainButton/MainButton";

const Modal = ({
                 title, type, isOpen, onSubmit, children,
               }) => {

  return (
      <>
        { isOpen &&
        <div className="modal-wrap">
          <div className="modal-header">
            <h1 className="header-title">{title}</h1>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <MainButton type={type}
                        onClick={onSubmit}>Ok</MainButton>
          </div>
        </div>
        }
      </>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  title: 'Modal title',
  isOpen: false,
  onSubmit: () => {},
  children: null,
};

export default wrapOverlay(Modal);
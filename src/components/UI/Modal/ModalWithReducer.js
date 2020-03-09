import React, {useContext} from 'react';
import {ModalContext} from "../../Context/modalContext/modalContext";
import MainButton from "../Buttons/MainButton/MainButton";
import Wrapper from "../../hoc/Wrapper/Wrapper";

const ModalWithReducer = () => {
  const {modalState, modalHide} = useContext(ModalContext);
  if (!modalState) return null;
  return (
      <Wrapper
          tag={'section'}
          className={'wrapOverlay'}
      >
        <div className="modal-wrap">
          <div className="modal-header">
            <h1 className="header-title">{modalState.title}</h1>
          </div>
          <div className="modal-body">
            {modalState.text}
            {modalState.count ?
                <p>
                  {modalState.count}
                </p>
                : null}
          </div>
          <div className="modal-footer">
            <MainButton
                type={'button'}
                onClick={modalHide}>Ok</MainButton>
          </div>
        </div>
      </Wrapper>
  );
};

export default ModalWithReducer;


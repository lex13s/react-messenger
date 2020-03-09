import React, {useReducer} from 'react';
import {ModalContext} from "./modalContext";
import {modalReducer} from "./modalReducer";
import {MODAL} from "../type";

export const ModalState = ({children}) => {
  const [state, dispatch] = useReducer(modalReducer, null);
  const modalShow = (title, text) => {
    dispatch({
      type: MODAL.SHOW_MODAL,
      payload: {title, text}
    })
  };
  const modalHide = () => dispatch({type: MODAL.HIDE_MODAL});
  const modalShowHide = (title, text, count) => {
    dispatch({
      type: MODAL.SHOW_MODAL_HIDE,
      payload: {title, text, count}
    });
  };
  return (
      <ModalContext.Provider value={{
        modalHide,
        modalShow,
        modalShowHide,
        modalState: state
      }}>
        {children}
      </ModalContext.Provider>
  )
};
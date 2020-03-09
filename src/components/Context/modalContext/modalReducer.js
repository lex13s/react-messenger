import {MODAL} from "../type";

const handlers = {
  [MODAL.SHOW_MODAL]: (state, action) => {
    return action.payload
  },
  [MODAL.HIDE_MODAL]: () => null,
  [MODAL.SHOW_MODAL_HIDE]: (state, action) => {
    return action.payload
  },
  DEFAULT: state => state
};

export const modalReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
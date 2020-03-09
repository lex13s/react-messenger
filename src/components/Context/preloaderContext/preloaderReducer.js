import {PRELOADER} from '../type';

const handlers = {
  [PRELOADER.ISLOADING]: (state, action) => {
    return action.payload
  },
  [PRELOADER.ISLOADED]: () => null,
  DEFAULT: state => state
};

export const preloaderReducer = (state, action) => {
  const result = handlers[action.type] || handlers.DEFAULT;
  return result(state, action);
};
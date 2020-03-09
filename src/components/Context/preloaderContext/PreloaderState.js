import React, {useReducer} from 'react';
import {preloaderReducer} from './preloaderReducer';
import {PreloaderContext} from './preloaderContext';
import {PRELOADER} from '../type';

export const PreloaderState = ({children}) => {
  const [state, dispatch] = useReducer(preloaderReducer, null);
  const hidePreloader = (second) => {
    let time = second * 1000;
    if (!second) time = 1500;
    setTimeout(() => {
      dispatch({
        type: PRELOADER.ISLOADING,
        payload: {second}
      })
    }, time);
  };
  const showPreloader = () => dispatch({type: PRELOADER.ISLOADED});
  return (
      <PreloaderContext.Provider value={{
        showPreloader,
        hidePreloader,
        state
      }}>
        {children}
      </PreloaderContext.Provider>
  )
};


import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Wrapper from "../../hoc/Wrapper/Wrapper";
import {PreloaderContext} from '../../Context/preloaderContext/preloaderContext'

export const Preloader = () => {
  const {state} = useContext(PreloaderContext);
  if (state) return null;
  return (
      <Wrapper
          tag={'section'}
          className={'wrapOverlay'}
      >
        <div className="container">
          <div className="item-1"/>
          <div className="item-2"/>
          <div className="item-3"/>
          <div className="item-4"/>
          <div className="item-5"/>
        </div>
      </Wrapper>
  )
};
Preloader.propTypes = {
  state: PropTypes.bool
};
Preloader.defaultProps = {
  state: false
};
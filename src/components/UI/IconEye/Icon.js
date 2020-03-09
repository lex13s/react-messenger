import React from 'react';
import classNames from 'classname';
import PropTypes from 'prop-types';

const Icon = ({
                className, name, onClick, active, disabled, size, ...attrs
              }) => {
  const classI = classNames(
      `fa`,
      `fa-${name}`,
      className,
      active,
      {disabled},
      {func: onClick}
  );
  const iconSize = size ? {fontSize: `${size}rem`} : null;
  return (
      <>
        <i className={classI}
           onClick={disabled ? null : onClick}
           style={iconSize}
           {...attrs}
        >
        </i>
      </>
  )
};

Icon.propTypes = {
  classNames: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  onClick: PropTypes.func
};
Icon.defaultProps = {
  name: '',
  className: '',
  size: null,
  onClick: null,
  disabled: false,
};

export default Icon;
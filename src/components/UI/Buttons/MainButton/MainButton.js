import React from 'react';
import PropTypes from 'prop-types'
import classNames from "classname";

const MainButton = ({
                      children, className, disabled, type, active, onClick, ...attrs
                    }) => {
  const onClickAction = (e) => {
    disabled ? e.preventDefault() : onClick(e)
  };
  const classes = classNames(
      className,
      {active},
  );
  const Tag = attrs.href ? 'a' : 'button';
  return (
      <Tag
          {...attrs}
          className={classes}
          type={type}
          disabled={disabled}
          onClick={onClickAction}
      >
        {children}
      </Tag>
  );
};
MainButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool
};
MainButton.defaultProps = {
  children: 'Button',
  onClick: () => {
  },
  className: '',
  disabled: false,
  active: false
};
export default MainButton;

import React from 'react';
import classNames from 'classname';
import PropTypes from 'prop-types';

const UserName = ({className, name}) => {
  const classes = classNames(
      className, name
  );
  return (
      <section className={classes} key={`${name}_${className}`}>
        {name}
      </section>
  )
};
UserName.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string
};
UserName.defaultProps = {
  className: 'contacts-card__user-name',
  name: ''
};
export default UserName;
import React from 'react';

const Wrapper = (props) => {
  const Tag = props.tag ? props.tag : "div",
      className = props.className;
  return (
      <Tag className={className}>
        {props.children}
      </Tag>
  )
};
export default Wrapper;
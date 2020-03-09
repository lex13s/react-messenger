import React from "react";

const withClass = (Component, className, tag) => {
  const Tag = tag ? tag : "div";
  return (props) => {
    return (
        <Tag className={className}
             style={props.style}
        >
          <Component {...props}/>
        </Tag>
    )
  }
};
export default withClass;

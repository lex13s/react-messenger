import React from "react";

const wrapOverlay = (Component) => {
  return (props) => {
    return (
        <section className={'wrapOverlay'}>
          <Component {...props}/>
        </section>
    )
  }
};
export default wrapOverlay;
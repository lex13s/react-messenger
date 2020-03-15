import React from 'react';

const ButtonSend = ({onClick, disabled}) => {
  return (
      <section className="button-send-wrap">
        <button className="messages-footer__button-send"
                value="push"
                onClick={(event) => onClick(event)}
                disabled={disabled}
        >
          Meow!
        </button>
      </section>
  )
};
export default ButtonSend;

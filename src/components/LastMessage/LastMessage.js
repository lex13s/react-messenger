import React from 'react';

const LastMessage = ({dataMessages}) => {

  const getLastMessage = (data)=> {
    const key = 'messages';
    return Object.values(data[key]).reverse()[0].text
  };

  const lastMessage = getLastMessage(dataMessages);

  if (!lastMessage) return  null;

   return (
            <section className="contacts-card__last-message">
              {lastMessage}
            </section>
  )
};

export default LastMessage;
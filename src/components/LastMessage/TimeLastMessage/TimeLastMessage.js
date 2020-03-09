import React from 'react';

const TimeLastMessage = ({dataMessages}) => {

  const getTimeLastMessage = (data)=> {
    const key = 'messages';
    return Object.values(data[key]).reverse()[0].timestamp
  };
  const options = {month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
  const timeLastMessage = new Date(getTimeLastMessage(dataMessages, 'messages')).toLocaleString('en-GB', options);

  if (!timeLastMessage) return  null;

  return (
      <section className="contacts-card__time-last-message">
        {timeLastMessage}
      </section>
  )
};

export default TimeLastMessage;
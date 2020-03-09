import React from 'react';

const MessagesItem = ({author, text, timestamp, user}) => {
  if (author && text && timestamp) {
    const options = {hour: '2-digit', minute: '2-digit'};
    const timeLastMessage = new Date(timestamp).toLocaleString('en-GB', options);
    return (
        <section className={author === user ? 'my-message-wrap' : 'friend-message-wrap'}
                 key={author + timestamp}
        >
          <section className={'container-inline'}>
            <section className={`message-item__${author}`}>
              <p>{text}</p>
            </section>
            <section className="message-item__time">{timeLastMessage}</section>
          </section>
        </section>
    )
  } else {
    return null
  }
};
export default MessagesItem;


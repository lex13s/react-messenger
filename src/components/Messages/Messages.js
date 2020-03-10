import React from 'react';
import MessagesItem from "./MessagesItem/MassagesItem";

import SendArea from "./SendArea/SendArea";
import Firebase from "../Firebase/Firebase";

const Messages = ({user, chatKey, isActive}) => {
  const {messages} = Firebase;

  const showMessages = isActive === 'show' ? 'hide' : 'show';

  const messagesRender = () => {
    let dataMessages = {};

    messages.on('value', snapshot => {
      dataMessages = snapshot.val();
    });

      if (dataMessages[chatKey]) {
        const message = Object.values(dataMessages[chatKey].messages).map((e, i) => {
          return (
              <MessagesItem author={e.author}
                            text={e.text}
                            timestamp={e.timestamp}
                            key={e.timestamp + e.author}
                            user={user}/>
          )
        });
        return message;
      } else {
        return null
      }



  };

  return (
      <article className={`messages ${showMessages}`}>
        <main className="messages-items">
          {messagesRender()}
        </main>
        <footer className="messages-footer">
          <form action="">
            <section className="form-wrap">
              <SendArea currentUser={user} chatKey={chatKey}/>
            </section>
          </form>
        </footer>
      </article>
  )
};

export default Messages;

import React, {useContext} from 'react';
import MessagesItem from "./MessagesItem/MassagesItem";
//import Emoji from "./Emoji/Emoji";
import SendArea from "./SendArea/SendArea";
import {FirebaseContext} from "../Context/firebaseContext/FirebaseContext";

const Messages = ({user, chatKey, isActive}) => {
  const {dataMessages} = useContext(FirebaseContext);
  const showMessages = isActive === 'show' ? 'hide' : 'show';

  const messagesRender = () => {
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
  messagesRender();
  return (
      <article className={`messages ${showMessages}`}>
        <main className="messages-items">
          {messagesRender()}
        </main>
        <footer className="messages-footer">
          <form action="">
            <section className="form-wrap">
              {/*<Emoji/>*/}
              <SendArea currentUser={user} chatKey={chatKey}/>
            </section>
          </form>
        </footer>
      </article>
  )
};

export default Messages;

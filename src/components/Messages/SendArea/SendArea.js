import React, {useState, useEffect} from 'react';
import ButtonSend from "../ButtonSend/ButtonSend";
import Firebase from "../../Firebase/Firebase";
import firebase from "firebase";

const SendArea = ({chatKey, currentUser}) => {
  const {messages} = Firebase;
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [keyCtrl, setKeyCtrl] = useState(false);
  const [keyEnter, setKeyEnter] = useState(false);
  useEffect(() => {
    setDisabled(message.length < 1)
  }, [message]);
  useEffect(() => {
    if (keyEnter && keyCtrl) {
    }
  }, [keyCtrl, keyEnter]);

  function sendMessage(event) {
    event.preventDefault();
    messages.once("value", () => {
      const newMessagesRef = messages.child(`/${chatKey}/messages`);
      newMessagesRef.push({
        author: currentUser,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        text: message
      });
    });
    setMessage('');
  }

  function sendMessageWithKeyboard(event) {
    if (event.keyCode === 13) {
      setKeyEnter(prevState => !prevState);
    }
    if (event.keyCode === 17) {
      setKeyCtrl(prevState => !prevState);
    }
    if (keyEnter && keyCtrl) {
      sendMessage(event);
    }
  }

  return (
      <>
        <section className="send-area-wrap"
                 onKeyDown={(e) => {
                   sendMessageWithKeyboard(e);
                 }}
                 onKeyUp={(e) => {
                   sendMessageWithKeyboard(e);
                 }}
        >
          <label htmlFor="messages-footer__send-area">

          </label>
          <textarea name=""
                    id="messages-footer__send-area"
                    className="messages-footer__send-area"
                    placeholder="Enter you message and press Ctr+Enter..."
                    autoFocus
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}>

          </textarea>
        </section>
        <ButtonSend onClick={sendMessage.bind(this)}
                    disabled={disabled}
        />
      </>
  )
};
export default SendArea;

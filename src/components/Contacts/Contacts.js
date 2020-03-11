import React, {useContext, useState, useEffect} from 'react';
import classNames from 'classname';
import {FirebaseContext} from "../Context/firebaseContext/FirebaseContext";
import {AuthContext} from "../Context/authContext/AuthContext";
import Head from "../Head/Head";
import Messages from "../Messages/Messages";
import ContactCards from "../ContactCard/ContactCards";
import MessagesPreloader from "../../pages/MessagesPreloader";
import {Redirect} from 'react-router-dom';

const Contacts = ({firebaseInitialized, dataUsersOnline, currentUser}) => {
  console.log(dataUsersOnline);

  const {usersList, createChatKey} = useContext(FirebaseContext);
  //const {currentUser} = useContext(AuthContext);
  console.log(currentUser);
  const [show, setShow] = useState('show');
  const [userFriend, setUserFriend] = useState();
  const [chatKey, setChatKey] = useState();
  const [showMessage, setShowMessage] = useState();

  let classContacts = classNames(
      'contacts',
      'contacts-wrap',
  );
  useEffect(() => {
    if (userFriend && chatKey) setShowMessage(true)
  }, [userFriend, chatKey]);

  return firebaseInitialized ? (
      <>
        <Head className="contacts-card__user-name_in-header"
              user={userFriend}
              status={userFriend && dataUsersOnline[userFriend] ? 'status_online' : 'status_offline'}
              backContacts={setShow}
              isActiveMessages={show}
              showStatus={show}
              currentUser={currentUser}/>


        <main className='main'>
          <nav className={`${classContacts} ${show}`}>
            <ContactCards usersList={usersList}
                          currentUser={currentUser}
                          dataUsersOnline={dataUsersOnline}
                          createChatKey={createChatKey}
                          setShow={setShow}
                          setUserFriend={setUserFriend}
                          setChatKey={setChatKey}/>
          </nav>

          {showMessage && <Messages user={currentUser} chatKey={chatKey} isActive={show}/> || <MessagesPreloader/>}
        </main>
      </>
  ) : <Redirect to="/"/>
};
export default Contacts;
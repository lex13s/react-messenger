import React, {useState, useEffect, useContext} from 'react';
import Firebase from "../../Firebase/Firebase";
import {AuthContext} from "../authContext/AuthContext";

export const FirebaseContext = React.createContext();
export const FirebaseProvide = ({children}) => {
  const {currentUser} = useContext(AuthContext);
  const {messages, getDataUsers} = Firebase;
  const [usersList, setUsersList] = useState();
  const [dataUsersOnline, setDataUsersOnline] = useState();
  const [dataMessages, setDataMessages] = useState();

  useEffect(() => {
    getDataUsers().then((data) => {
      let users = Object.keys(data);
      setUsersList(users);
    });
  }, [dataUsersOnline]);

  useEffect(() => {
    messages.on('value', snapshot => {
      setDataMessages(snapshot.val());
    }, []);
  }, []);

  function createChatKey(user) {
    if (!currentUser) throw new Error('myUsername has not been set!');
    let arr = [];
    arr.push(user, currentUser);
    arr.sort();
    return arr.join('__');
  }

  return (
      <FirebaseContext.Provider
          value={{
            usersList,
            dataMessages,
            setDataMessages,
            dataUsersOnline,
            createChatKey,
            setDataUsersOnline
          }}
      >
        {children}
      </FirebaseContext.Provider>
  );
};
FirebaseContext.displayName = "Firebase Context";

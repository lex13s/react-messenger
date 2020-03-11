import React, {useState, useEffect} from 'react';
import firebase from "firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState(null);

  // useEffect( ()=> {
  //   setCurrentUser( ()=> firebase.getCurrentUsername() )
  // });

  return (
      <AuthContext.Provider
          value={{
            currentUser,
            setCurrentUser
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

AuthContext.displayName = "Authorisation Context";
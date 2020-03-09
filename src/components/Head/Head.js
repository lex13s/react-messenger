import React, {useState, useEffect, useContext} from 'react';
import BtnComeBack from './BtnComeBack/BtnComeBack.js'
import Avatar from "./Avatar/Avatar";
import UserName from "./UserName/UserName";
import Status from "../Status/Status";
import {AuthContext} from '../Context/authContext/AuthContext';

const Head = ({user, className, status, backContacts, isActiveMessages, showStatus}) => {
  //==========
  const {currentUser} = useContext(AuthContext);
  const [showFriendAvatar, setShowFriendAvatar] = useState(currentUser);
  useEffect( ()=> {
    if (user) {
      setShowFriendAvatar(user)
    }
  }, [user]);

  //console.log('user-', user);
  //console.log('showFriendAvatar-', showFriendAvatar);

  ///////////////

  const showStatusFriend = showStatus === 'show' ? 'hide' : 'show';

  return (
      <header className="header">
        <BtnComeBack backContacts={backContacts}
                     setShowFriendAvatar={setShowFriendAvatar}
                     user={currentUser}
                     className={isActiveMessages}
        />

        <h1 className={`header__chat-name ${showStatus}`}>{`React chat `}<span>by Alex</span></h1>

        <div className='header-user-wrap'>
          {<Avatar className='header-avatar' user={showFriendAvatar}/>}
          <UserName className={className} name={isActiveMessages === 'hide' && user || ''}/>
        </div>

        <Status className={`${showStatusFriend} header__status`} status={status}/>
      </header>
  )
};

export default Head;

import React, {useState, useEffect} from 'react';
import BtnComeBack from './BtnComeBack/BtnComeBack.js'
import Avatar from "./Avatar/Avatar";
import UserName from "./UserName/UserName";
import Status from "../Status/Status";

const Head = ({user, className, status, backContacts, isActiveMessages, showStatus, currentUser}) => {
  const [showFriendAvatar, setShowFriendAvatar] = useState(currentUser);
  useEffect(() => {
    if (user) {
      setShowFriendAvatar(user)
    } else {
      setShowFriendAvatar(currentUser)
    }
  }, [user]);
  const showStatusFriend = showStatus === 'show' ? 'hide' : 'show';
  return (
      <header className="header">
        <BtnComeBack backContacts={backContacts}
                     setShowFriendAvatar={setShowFriendAvatar}
                     user={currentUser}
                     className={isActiveMessages}
        />
        <div className={`header-kitty-wrap ${isActiveMessages}`}>
          <img className="header-kitty" src="https://clipartart.com/images/angery-cat-clipart-3.png" alt='chat avatar'/>
          <h1 className={`header__chat-name ${showStatus}`}>{`React chat `}<span>by Alex</span></h1>
        </div>
        <div className='header-user-wrap'>
          <div className="header-avatar_wrap">

            <Avatar className='header-avatar'
                    user={showFriendAvatar || currentUser || ''}
                    status={status}/>

            <UserName className={className}
                      name={isActiveMessages === 'hide' && user || ''}/>
          </div>
          <Status className={`${showStatusFriend} header__status`}
                  isActive={isActiveMessages === 'hide' && user || ''}
                  status={status}/>
        </div>
      </header>
  )
};
export default Head;





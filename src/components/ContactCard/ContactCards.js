import React, {useContext} from 'react';
import Avatar from "../Head/Avatar/Avatar";
import UserName from "../Head/UserName/UserName";
import LastMessage from "../LastMessage/LastMessage";
import Status from "../Status/Status";
import TimeLastMessage from "../LastMessage/TimeLastMessage/TimeLastMessage";
import {FirebaseContext} from "../Context/firebaseContext/FirebaseContext";

const ContactCards = ({usersList, currentUser, dataUsersOnline, createChatKey, setShow, setUserFriend, setChatKey}) => {
  const {dataMessages} = useContext(FirebaseContext);
  const contactCardRender = (data) => {
    const contactCard = usersList.map((user) => {
      const chatKey = createChatKey(user);
      if (currentUser === user) {
        return null;
      }
      return (
          <section className="contacts-card contacts-card-wrap"
                   key={`contacts-card_${user}`}
                   onClick={() => {
                     setUserFriend(user);
                     setChatKey(chatKey);
                     setShow('hide');
                   }}
          >
            <Avatar className='contacts-card-avatar' user={user} key={`contacts-card-avatar_${user}`}/>
            <UserName className='contacts-card__user-name' name={user} key={`contacts-card__user-name_${user}`}/>
            {dataMessages[chatKey] &&
            <LastMessage dataMessages={dataMessages[chatKey]} key={`contacts-card__last-message_${user}`}/>}
            {dataMessages[chatKey] &&
            <TimeLastMessage dataMessages={dataMessages[chatKey]} key={`contacts-card__time-last-message_${user}`}/>}
            <Status className={'contacts-card__status'}
                    status={data[user] ? 'status_online' : 'status_offline'}
                    key={`contacts-card__status_${user}`}/>
          </section>
      )
    });
    return contactCard;
  };
  return (
      <div>
        {usersList && currentUser && dataUsersOnline && contactCardRender(dataUsersOnline)}
      </div>
  )
};
export default ContactCards;
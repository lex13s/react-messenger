import React from 'react';
import Avatar from "../Head/Avatar/Avatar";
import UserName from "../Head/UserName/UserName";
import LastMessage from "../LastMessage/LastMessage";
import Status from "../Status/Status";
import TimeLastMessage from "../LastMessage/TimeLastMessage/TimeLastMessage";
import Firebase from "../Firebase/Firebase";
import {useHistory} from 'react-router-dom';

const ContactCards = ({usersList, currentUser, dataUsersOnline, createChatKey, setShow, setUserFriend, setChatKey}) => {
  const {messages} = Firebase;
  let history = useHistory();
  const contactCardRender = (data) => {
    let dataMessages = {};
    messages.on('value', snapshot => {
      dataMessages = snapshot.val();
    }, []);
    const contactCard = usersList.map((user) => {
      const chatKey = createChatKey(user);
      if (currentUser === user) {
        return null;
      }
      return (
          <section className="contacts-card"
                   key={`contacts-card_${user}`}
                   onClick={() => {
                     setUserFriend(user);
                     setChatKey(chatKey);
                     setShow('hide');
                     history.push(`/home/${chatKey}/`);
                   }}>

            <Avatar className='contacts-card' user={user} key={`contacts-card-avatar_${user}`}/>

            <div className="contacts-card__info">
              <div className="contacts-card__info-items">
                <UserName className='contacts-card__user-name' name={user} key={`contacts-card__user-name_${user}`}/>
                <Status className={'contacts-card__status'}
                        status={data[user] ? 'status_online' : 'status_offline'}
                        key={`contacts-card__status_${user}`}/>
              </div>
              <div className="contacts-card__info-items">
                {dataMessages[chatKey] &&
                <LastMessage dataMessages={dataMessages[chatKey]} key={`contacts-card__last-message_${user}`}/>}
                {dataMessages[chatKey] &&
                <TimeLastMessage dataMessages={dataMessages[chatKey]}
                                 key={`contacts-card__time-last-message_${user}`}/>}
              </div>
            </div>
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
import React from 'react';
import {useHistory} from 'react-router-dom';

const BtnComeBack = ({backContacts, className, setShowFriendAvatar, user}) => {
  let history = useHistory();
  return (
      <section className={`${className === 'show' ? 'hide' : 'show'} btn-come-back`}
               onClick={() => {
                 backContacts('show');
                 setShowFriendAvatar(user);
                 history.goBack();
               }}
      >
        <svg id="Capa_1" enableBackground="new 0 0 551.13 551.13" height="512" viewBox="0 0 551.13 551.13" width="512"
             xmlns="http://www.w3.org/2000/svg">
          <path d="m189.451 275.565 223.897-223.897v-51.668l-275.565 275.565 275.565 275.565v-51.668z"/>
        </svg>
      </section>
  )
};
export default BtnComeBack;


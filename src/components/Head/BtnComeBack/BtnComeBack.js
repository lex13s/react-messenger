import React from 'react';
import { useHistory } from 'react-router-dom';


const BtnComeBack = ({backContacts, className, setShowFriendAvatar, user}) => {
  let history = useHistory();

  return (
      <section className={`${className === 'show' ? 'hide' : 'show' } btn-come-back`}
               onClick={ ()=> {
                 backContacts('show');
                 setShowFriendAvatar(user);
                 history.push('/home/')
               }}
      >
        &larr;
      </section>
  )
};

export default BtnComeBack;
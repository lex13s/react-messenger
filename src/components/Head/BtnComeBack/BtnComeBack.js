import React from 'react';

const BtnComeBack = ({backContacts, className, setShowFriendAvatar, user}) => {

  return (
      <section className={`${className === 'show' ? 'hide' : 'show' } btn-come-back`}
               onClick={ ()=> {
                 backContacts('show');
                 setShowFriendAvatar(user)
               }}
      >
        &larr;
      </section>
  )
};

export default BtnComeBack;
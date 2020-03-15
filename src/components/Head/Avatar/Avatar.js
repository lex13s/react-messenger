import React from 'react';

function Avatar({className, user}) {
  function firstChar(str) {
    return str.charAt(0).toUpperCase()
  }

  const currentUser = firstChar(user);
  return (
      <section className={`avatar ${className}_avatar`}>
        <img src="https://i.ibb.co/NtGCFM2/Group-77.png" alt='user avatar'/>
        <section className={'avatar-item'}>
          {currentUser}
        </section>
      </section>
  )
}

export default Avatar;
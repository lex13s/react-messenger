import React from 'react';

function Avatar({className, user, status}) {
  function firstChar(str) {
    return str.charAt(0).toUpperCase()
  }

  const currentUser = firstChar(user);
  return (
      <section className={`avatar ${className}_avatar`}>
        <img src="https://i.ibb.co/NtGCFM2/Group-77.png" alt='user avatar'/>
        <section className={`avatar-item ${status}`}>
          {currentUser}
        </section>
      </section>
  )
}

export default Avatar;
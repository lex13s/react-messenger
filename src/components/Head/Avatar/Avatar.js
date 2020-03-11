import React from 'react';

function Avatar({className, user}) {
  console.log(user);

  function firstChar(str) {
      return  str.charAt(0).toUpperCase()
  }

  const currentUser = firstChar(user);

  return (
      <section className={className + ' avatar'}>
        <div className={`${className}__item`}>
          {currentUser}
        </div>
      </section>
  )
}

export default Avatar;
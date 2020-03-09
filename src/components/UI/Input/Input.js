import React from 'react';
import classNames from 'classname';

const Input = ({
                 children, id, type, inputClass, labelClass, onChange, ...attrs
               }) => {
  const classesInput = classNames(
      inputClass
  );
  const classesLabel = classNames(
      labelClass
  );
  const inputType = type || 'text';
  return (
      <>
        <input
            key={id}
            type={inputType}
            name={id}
            id={id}
            className={classesInput}
            onChange={onChange ? onChange : () => {
            }}
            {...attrs}
        />
        {labelClass && <label
            htmlFor={id}
            className={classesLabel}
        >
          <span>{children}</span>

        </label>}

        {attrs.eye ? children : null}
      </>
  )
};
export default Input
import React from "react";
import { useDencrypt } from "use-dencrypt-effect";

const values = ["Никнейм разработчика - 1admin, пишите ;)"];

const MessagesPreloader = () => {
  const { result, dencrypt } = useDencrypt();

  React.useEffect(() => {
    let i = 0;

    const action = setInterval(() => {
      dencrypt(values[i]);

      i = i === values.length - 1 ? 0 : i + 1;
    }, 1000);

    return () => clearInterval(action);
  }, []);

  return (
      <div className='messages-preloader'>
      <h2 className='messages-preloader__title'>{result}</h2>
      </div>
  );
};

export default MessagesPreloader;
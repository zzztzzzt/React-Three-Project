'use client';

import styles from "../newsbars.css";
import { useEffect, useRef } from "react";
import { useNotification } from '../notificationContext';

const NewsBars = () => {
  const { message } = useNotification();
  const divOneRef = useRef(null);
  const divTwoRef = useRef(null);

  useEffect(() => {
    if (divOneRef.current && divTwoRef.current) {
      if (message === "Button clicked!") {
        divOneRef.current.style.left = "-100%";
        divTwoRef.current.style.left = "-100%";
      } else if (message === "Button clicked back!") {
        divOneRef.current.style.left = "-5%";
        divTwoRef.current.style.left = "-5%";
      }
    }
  }, [message]);

  return (
    <>
      <div ref={divOneRef} id="color-div-one">Title here</div>
      <div ref={divTwoRef} id="color-div-two">Title here</div>
    </>
  );
};

export default NewsBars;
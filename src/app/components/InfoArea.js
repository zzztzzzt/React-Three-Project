'use client';

import styles from "../infoarea.css";
import { useEffect, useState, useRef } from "react";
import { useNotification } from '../notificationContext';

const InfoArea = () => {
  const { sendNotification } = useNotification();
  const { message } = useNotification();
  const [returnCameraFlag, setReturnCameraFlag] = useState(false);
  const aboutRef = useRef(null);
  const iconOneRef = useRef(null);
  const iconTwoRef = useRef(null);
  const iconThreeRef = useRef(null);
  const iconFourRef = useRef(null);

  const handleClick = () => {
    if (returnCameraFlag) {
      sendNotification("Logo clicked back!");
      setReturnCameraFlag(false);
    } else {
      sendNotification("Logo clicked!");
      setReturnCameraFlag(true);
    }
  };

  useEffect(() => {
    if (aboutRef.current && iconOneRef.current && iconTwoRef.current && iconThreeRef.current && iconFourRef.current) {
      if (message === "Button clicked!") {
        aboutRef.current.style.right = "-100%";
        aboutRef.current.style.bottom = "-100%";

        iconOneRef.current.style.bottom = "40%";
        iconTwoRef.current.style.bottom = "60%";
        iconThreeRef.current.style.bottom = "40%";
        iconFourRef.current.style.bottom = "60%";
        setTimeout(()=>{
          iconOneRef.current.style.zIndex = "auto";
          iconTwoRef.current.style.zIndex = "auto";
          iconThreeRef.current.style.zIndex = "auto";
          iconFourRef.current.style.zIndex = "auto";
          iconOneRef.current.style.transition = "0.3s";
          iconTwoRef.current.style.transition = "0.3s";
          iconThreeRef.current.style.transition = "0.3s";
          iconFourRef.current.style.transition = "0.3s";
        }, 2000);
      } else if (message === "Button clicked back!") {
        aboutRef.current.style.right = "0";
        aboutRef.current.style.bottom = "0";

        iconOneRef.current.style.zIndex = "-5";
        iconTwoRef.current.style.zIndex = "-5";
        iconThreeRef.current.style.zIndex = "-5";
        iconFourRef.current.style.zIndex = "-5";
        iconOneRef.current.style.transition = "3s";
        iconTwoRef.current.style.transition = "3s";
        iconThreeRef.current.style.transition = "3s";
        iconFourRef.current.style.transition = "3s";
        iconOneRef.current.style.bottom = "0";
        iconTwoRef.current.style.bottom = "0";
        iconThreeRef.current.style.bottom = "0";
        iconFourRef.current.style.bottom = "0";
      }
    }
  }, [message]);

  return (
    <>
      <div id="logo">LOGO</div>

      <div id="about" ref={aboutRef}><p>About</p></div>

      <div id="icon-info-one" ref={iconOneRef}>✉</div>
      <div id="icon-info-two" ref={iconTwoRef}>✈︎</div>
      <div id="icon-info-three" ref={iconThreeRef}>✉</div>
      <div id="icon-info-four" ref={iconFourRef}>✈︎</div>

      <div id="eyes" onClick={handleClick}>ᨒ</div>
    </>
  );
};

export default InfoArea;
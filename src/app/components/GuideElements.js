'use client';

import { useState } from "react";
import { useNotification } from '../notificationContext';

const GuideElements = () => {
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState("☛ EXPLORE MORE");
  const { sendNotification } = useNotification();
  const [returnCameraFlag, setReturnCameraFlag] = useState(false);

  const handleClick = () => {
    setClicked(true);

    if (returnCameraFlag) {
      sendNotification("Button clicked back!");
      setReturnCameraFlag(false);
    } else {
      sendNotification("Button clicked!");
      setReturnCameraFlag(true);
    }

    setTimeout(() => {
      setText(prevText => prevText === "☛ EXPLORE MORE" ? "↶ BACK TO HOME" : "☛ EXPLORE MORE");
      setClicked(false);
    }, 1000);
  };

  return (
    <div
      id="main-text"
      onClick={handleClick}
      style={{
        opacity: clicked ? 0 : 1,
        transition: "opacity 1s ease-out"
      }}
    >
      {text}
    </div>
  );
};

export default GuideElements;
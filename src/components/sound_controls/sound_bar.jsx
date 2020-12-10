import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import Note from "./note";

const SoundBar = (props) => {
  const modal = useSelector((state) => state.ui.modal);
  const [soundArray, setSoundArray] = useState([]);
  const { isSelected, isRecording, windowWidth } = props;

  const shouldRender = useCallback(() => {
    return isSelected && isRecording && !modal;
  }, [isSelected, isRecording, modal]);

  const handleUserKeyDown = useCallback(
    (e) => {
      if (!shouldRender()) return;

      e.preventDefault();
      if (e.keyCode === 16 || e.keyCode === 32) return;
      const recordingLine = document.getElementById("recording-line");
      const calculatedLeft = window
        .getComputedStyle(recordingLine)
        .getPropertyValue("left");
      const calculatedLeftCleaned = calculatedLeft.slice(
        0,
        calculatedLeft.length - 2
      );

      setSoundArray(
        soundArray.concat({
          left: (calculatedLeftCleaned / windowWidth) * 100,
        })
      );
    },
    [shouldRender, windowWidth, soundArray]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyDown);

    return () => {
      window.removeEventListener("keydown", handleUserKeyDown);
    };
  }, [handleUserKeyDown]);

  return (
    <div className={isSelected ? "sound-bar" : "sound-bar selected"}>
      {soundArray.map((sound) => {
        return <Note left={sound.left} windowWidth={windowWidth} />;
      })}
    </div>
  );
};

export default SoundBar;

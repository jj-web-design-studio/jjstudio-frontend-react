import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { isPlayableKey } from "../keyboard/keys";
import Note from "./note";

import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const SoundBar = (props) => {
  const modal = useSelector((state) => state.ui.modal);

  const [soundArray, setSoundArray] = useState([]);
  const [isHoveringOptions, setHoveringOptions] = useState(false);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const { isSelected, isRecording, windowWidth } = props;

  const useStyles = makeStyles({
    moreHorizStyle: {
      position: "absolute",
      left: 98 + "%",
      opacity: isHoveringOptions ? 1 : 0.5,
    },
  });
  const classes = useStyles();

  const updateLeft = (index, left) => {
    soundArray[index].left = left;
    setSoundArray(soundArray);
  };

  const shouldRender = useCallback(
    (keyCode) => {
      return isSelected && isRecording && !modal && isPlayableKey(keyCode);
    },
    [isSelected, isRecording, modal]
  );

  const handleUserKeyDown = useCallback(
    (e) => {
      if (!shouldRender(e.keyCode)) return;

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
      console.log(soundArray)
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
      {soundArray.map((sound, index) => {
        return <Note key={index} index={index} left={sound.left} windowWidth={windowWidth} updateLeftInParent={updateLeft} />;
      })}
      <MoreHorizIcon
        className={classes.moreHorizStyle}
        onMouseEnter={() => setHoveringOptions(true)}
        onMouseLeave={() => setHoveringOptions(false)}
        onClick={() => setOptionsOpen(true)}
      />
    </div>
  );
};

export default SoundBar;

import React, { useEffect, useState, useCallback } from "react";
import { withRouter } from "react-router-dom";

import MetronomeSlider from "./metronome_slider";
import Note from "./note";
import PlayAndRecordButton from "./play_and_record_btn";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import "./soundbar.css";

const SoundBar = (props) => {
  const [isRecording, setRecording] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [numRows, setRows] = useState(1);
  const [soundArray, setSoundArray] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleUserKeyDown = useCallback(
    (e) => {
      const { keyCode } = e;
      if (keyCode === 16) {
        setRecording(!isRecording);
        return;
      }

      if (isRecording) {
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
            left: (calculatedLeftCleaned / windowWidth) * 100 + "%",
          })
        );
      }
    },
    [isRecording, soundArray, windowWidth]
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("keydown", handleUserKeyDown);

    return () => {
      window.removeEventListener("keydown", handleUserKeyDown);
    };
  }, [soundArray, handleUserKeyDown]);

  const rowIncrementer = (
    <div>
      <div className="soundBtn">
        <RemoveCircleIcon
          onClick={() => {
            numRows > 1 ? setRows(numRows - 1) : setRows(1);
          }}
        />
      </div>
      <div className="soundBtn">Rows: {numRows}</div>
      <div className="soundBtn">
        <AddCircleIcon
          onClick={() => {
            setRows(numRows + 1);
          }}
        />
      </div>
    </div>
  );

  const playAndRecordButtons = (
    <PlayAndRecordButton
      isRecording={isRecording}
      isPlaying={isPlaying}
      onClickPlaying={() => {
        setPlaying(!isPlaying);
      }}
      onClickRecording={() => {
        setRecording(!isRecording);
      }}
    />
  );

  const recordingLine = (
    <div className={!isRecording ? "" : "animation"} id="recording-line" />
  );

  return (
    <div>
      <div className="soundBar">
        {playAndRecordButtons}
        {rowIncrementer}
        <MetronomeSlider />
      </div>
      {recordingLine}
      <div>
        {soundArray.map((sound) => {
          return <Note left={sound.left} />;
        })}
      </div>
    </div>
  );
};

export default withRouter(SoundBar);

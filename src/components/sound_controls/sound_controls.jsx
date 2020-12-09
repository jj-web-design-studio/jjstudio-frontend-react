import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import MetronomeSlider from "./metronome_slider";
import SoundBar from "./sound_bar";
import RecordButton from "./record_button";
import PlayButton from "./play_button";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import "./sound_controls.css";

const SoundControls = (props) => {
  const modal = useSelector((state) => state.ui.modal);

  const [isRecording, setRecording] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [numRows, setRows] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleUserKeyDown = useCallback(
    (e) => {
      if (!modal) {
        e.preventDefault();
        const { keyCode } = e;
        if (keyCode === 16) {
          setRecording(!isRecording);
        } else if (keyCode === 32) {
          setPlaying(!isPlaying);
        }
      }
    },
    [modal, isRecording, isPlaying]
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("keydown", handleUserKeyDown)
  
    return () => {
      window.removeEventListener("keydown", handleUserKeyDown);
    };
  }, [handleUserKeyDown, isRecording]);

  const rowIncrementer = (
    <div className="soundBtn">
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

  const recordButton = (
    <RecordButton
      isRecording={isRecording}
      onClick={() => {
        setRecording(!isRecording);
      }}
    />
  );

  const playButton = (
    <PlayButton
      isPlaying={isPlaying}
      onClick={() => {
        setPlaying(!isPlaying);
      }}
    />
  );

  const recordingLine = (
    <div
      className={
        isRecording
          ? "animation recording-line-active"
          : isPlaying
          ? "animation playing-line-active"
          : ""
      }
      id="recording-line"
    />
  );

  let soundBars = [];
  for (let i = 0; i < numRows; i++) {
    soundBars.push(
      <SoundBar key={i} windowWidth={windowWidth} isSelected={i === numRows - 1} />
    );
  }

  return (
    <div>
      <div className="sound-controls">
        <div className="soundBtn">
          {recordButton}
          {playButton}
        </div>
        {rowIncrementer}
        <MetronomeSlider />
      </div>
      {recordingLine}
      {soundBars}
    </div>
  );
};

export default SoundControls;

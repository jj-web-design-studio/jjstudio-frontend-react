import { useEffect, useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import MetronomeSlider from "./metronome_slider";
import Note from "./note";
import RecordButton from "./record_button";
import PlayButton from "./play_button";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import "./soundbar.css";

const SoundBar = (props) => {
  const modal = useSelector((state) => state.ui.modal);

  const [isRecording, setRecording] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [numRows, setRows] = useState(1);
  const [soundArray, setSoundArray] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleUserKeyDown = useCallback(
    (e) => {
      if (modal === null) {
        e.preventDefault();
        const { keyCode } = e;
        if (keyCode === 16) {
          setRecording(!isRecording);
          return;
        } else if (keyCode === 32) {
          setPlaying(!isPlaying);
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
      }
    },
    [modal, isRecording, isPlaying, soundArray, windowWidth]
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("keydown", handleUserKeyDown);

    return () => {
      window.removeEventListener("keydown", handleUserKeyDown);
    };
  }, [soundArray, handleUserKeyDown]);

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

  return (
    <div>
      <div className="soundBar">
        <div className="soundBtn">
          {recordButton}
          {playButton}
        </div>
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

import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import BPMSlider from "./bpm_slider";
import SoundBar from "./sound_bar";
import RecordButton from "./record_button";
import PlayButton from "./play_button";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const BASELINE_MAX_BPM_ANIMATION_SECONDS = 6.4;
const BASELINE_MAX_BPM = 150;
const HOVER_LINE_SPACING = 6.25;

const SoundControls = (props) => {
  const modal = useSelector((state) => state.ui.modal);

  const [isRecording, setRecording] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [numRows, setRows] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isHoveringBars, setHoveringBars] = useState(false);
  const [bpm, setBpm] = useState(125);

  const handleUserKeyDown = useCallback(
    (e) => {
      if (modal) return;

      e.preventDefault();

      if (e.keyCode === 16) {
        setRecording(!isRecording);
      } else if (e.keyCode === 32) {
        setPlaying(!isPlaying);
      }
    },
    [modal, isRecording, isPlaying]
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  
    window.addEventListener("keydown", handleUserKeyDown);

    return () => {
      window.removeEventListener("keydown", handleUserKeyDown);
    };
  }, [handleUserKeyDown, isRecording, isPlaying, numRows, bpm]);

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
      style={{
        animationDuration:
          isRecording || isPlaying
            ? (
                BASELINE_MAX_BPM_ANIMATION_SECONDS /
                (bpm / BASELINE_MAX_BPM)
              ).toFixed(2) + "s"
            : "",
      }}
      id="recording-line"
    />
  );

  const soundBars = function () {
    const soundBars = [];
    for (let i = 0; i < numRows; i++) {
      soundBars.push(
        <SoundBar
          key={i}
          windowWidth={windowWidth}
          isSelected={i === numRows - 1}
          isRecording={isRecording}
        />
      );
    }
    return soundBars;
  };

  const hoverLines = function (increment) {
    let hoverLines = [];
    for (let i = 1; i < 16; i++) {
      hoverLines.push(
        <div
          className="hover-line"
          style={
            isHoveringBars
              ? {
                  left: increment * i + "%",
                  opacity: i % 4 === 0 ? 1 : 0.4,
                  borderLeft:
                    i % 4 === 0 ? "1px solid grey" : "1px dotted grey",
                }
              : {}
          }
        />
      );
    }
    return hoverLines;
  };

  const updateBpm = (bpmValue) => {
    setBpm(bpmValue);
    setPlaying(false);
    setRecording(false);
  };

  return (
    <div style={{ backgroundColor: "lightpink" }}>
      <div className="sound-controls">
        <div className="soundBtn">
          {recordButton}
          {playButton}
        </div>
        {rowIncrementer}
        <BPMSlider bpm={bpm} updateBpm={updateBpm} />
      </div>
      {recordingLine}
      <div
        className="sound-bar-wrapper"
        onMouseEnter={() => {
          setHoveringBars(true);
        }}
        onMouseLeave={() => {
          setHoveringBars(false);
        }}
      >
        {soundBars()}
        {hoverLines(HOVER_LINE_SPACING)}
      </div>
    </div>
  );
};

export default SoundControls;

import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import BPMSlider from "./buttons/bpm_slider";
import SoundBar from "./sound_bar";
import RecordButton from "./buttons/record_button";
import PlayButton from "./buttons/play_button";
import RowIncrementer from "./buttons/row_incrementer";
import BarLines from "./bar_lines";

const BASELINE_MAX_BPM_ANIMATION_SECONDS = 6.4;
const BASELINE_MAX_BPM = 150;
const BAR_LINE_SPACING = 6.25;

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

  return (
    <div style={{ backgroundColor: "lightpink" }}>
      <div className="sound-controls">
        <div className="soundBtn">
          <RecordButton
            isRecording={isRecording}
            onClick={() => {
              setRecording(!isRecording);
            }}
          />
          <PlayButton
            isPlaying={isPlaying}
            onClick={() => {
              setPlaying(!isPlaying);
            }}
          />
        </div>
        <RowIncrementer setRows={setRows} />
        <BPMSlider bpm={bpm} updateBpm={setBpm} />
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
        {<BarLines spacing={BAR_LINE_SPACING} shouldRender={isHoveringBars} />}
      </div>
    </div>
  );
};

export default SoundControls;

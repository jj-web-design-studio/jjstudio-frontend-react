import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BPMSlider from "./buttons/bpmSlider";
import SoundBar from "./soundBar";
import RowIncrementer from "./buttons/rowIncrementer";
import BarLines from "./barLines";
import Metronome from "./metronome/metronome";
import LoadTrackButton from "../track/loadTrackButton";
import SaveTrackButton from "../track/saveTrackButton";

const BASELINE_MAX_BPM_ANIMATION_SECONDS = 6.4;
const BASELINE_MAX_BPM = 150;
const BAR_LINE_SPACING = 6.25;

const SoundControls = (props) => {
  const track = useSelector((state) => state.track);
  const bpm = useSelector((state) => state.track.track.bpm);

  const [isRecording, setRecording] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [numRows, setRows] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isHoveringBars, setHoveringBars] = useState(false);

  const toggleRecord = (isRecording) => {
    setRecording(isRecording);
  };

  const togglePlay = (isPlaying) => {
    setPlaying(isPlaying);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    // Hiding event listener for now
    // window.addEventListener("keydown", handleUserKeyDown);

    // return () => {
    //   window.removeEventListener("keydown", handleUserKeyDown);
    // };
  }, [isRecording, isPlaying, numRows, track]);

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
        <Metronome
          toggleRecord={toggleRecord}
          togglePlay={togglePlay}
        />
        <RowIncrementer setRows={setRows} />
        <BPMSlider />
        <SaveTrackButton />
        <LoadTrackButton />
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

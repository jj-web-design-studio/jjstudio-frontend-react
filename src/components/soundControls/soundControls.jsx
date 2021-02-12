import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BPMSlider from "./buttons/bpmSlider";
import SoundBar from "./soundBar";
import RowIncrementer from "./buttons/rowIncrementer";
import BarLines from "./barLines";
import Metronome from "./metronome/metronome";

import { Grid } from "@material-ui/core";

const BASELINE_MAX_BPM_ANIMATION_SECONDS = 6.4;
const BASELINE_MAX_BPM = 150;
const BAR_LINE_SPACING = 6.25;

const SoundControls = (props) => {
  const track = useSelector((state) => state.track);
  const bpm = useSelector((state) => state.track.track.bpm);
  const rowCount = useSelector((state) => state.track.track.rowCount);

  const [isRecording, setRecording] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [isHoveringBars, setHoveringBars] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const toggleRecord = (isRecording) => {
    setRecording(isRecording);
  };

  const togglePlay = (isPlaying) => {
    setPlaying(isPlaying);
  };

  useEffect(() => {
    function debounce(fn, ms) {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          fn.apply(this, ...arguments);
        }, ms);
      };
    }

    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [isRecording, isPlaying, rowCount, track, dimensions]);

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
    for (let i = 0; i < rowCount; i++) {
      soundBars.push(
        <SoundBar
          key={i}
          rowIndex={i}
          windowWidth={dimensions.width}
          isSelected={i === rowCount - 1}
          isRecording={isRecording}
        />
      );
    }
    return soundBars;
  };

  return (
    <div style={{ backgroundColor: "#1c1e21" }}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className="sound-controls panel"
      >
        <Metronome toggleRecord={toggleRecord} togglePlay={togglePlay} />
        <RowIncrementer />
        <BPMSlider />
      </Grid>
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

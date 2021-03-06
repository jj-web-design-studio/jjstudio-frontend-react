import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import RecordButton from "../buttons/recordButton";
import PlayButton from "../buttons/playButton";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";

import * as serviceWorker from "./metronomeWorker.js";

import { Grid } from "@material-ui/core";

const Metronome = (props) => {
  const bpm = useSelector((state) => state.track.track.bpm);

  const [isPlaying, setPlaying] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const [isMuted, setMuted] = useState(false);
  const [audioContext, setAudioContext] = useState(new AudioContext());

  const timerWorker = useRef(null);
  const unlocked = useRef(false);
  const isMetronomeOn = useRef(false);
  const notesInQueue = useRef([]);
  const current16thNote = useRef(null);

  const lookahead = 25.0;
  const scheduleAheadTime = 0.1;
  const nextNoteTime = useRef(0.0);
  const noteResolution = 2;
  const noteLength = 0.05;

  const {
    toggleRecord: toggleRecordParent,
    togglePlay: togglePlayParent,
  } = props;

  const nextNote = () => {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / bpm; // Notice this picks up the CURRENT
    // tempo value to calculate beat length.
    nextNoteTime.current += 0.25 * secondsPerBeat; // Add beat length to last beat time

    current16thNote.current++; // Advance the beat number, wrap to zero
    if (current16thNote.current === 16) {
      current16thNote.current = 0;
    }
  };

  const scheduleNote = (beatNumber, time) => {
    // push the note on the queue, even if we're not playing.
    notesInQueue.current.push({ note: beatNumber, time: time });

    if (noteResolution === 1 && beatNumber % 2) return; // we're not playing non-8th 16th notes
    if (noteResolution === 2 && beatNumber % 4) return; // we're not playing non-quarter 8th notes

    // create an oscillator
    var osc = audioContext.createOscillator();
    osc.connect(audioContext.destination);
    if (beatNumber % 16 === 0)
      // beat 0 == high pitch
      osc.frequency.value = 880.0;
    else if (beatNumber % 4 === 0)
      // quarter notes = medium pitch
      osc.frequency.value = 440.0;
    // other 16th notes = low pitch
    else osc.frequency.value = 220.0;

    osc.start(time);
    osc.stop(time + noteLength);
  };

  const scheduler = () => {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (
      nextNoteTime.current <
      audioContext.currentTime + scheduleAheadTime
    ) {
      scheduleNote(current16thNote.current, nextNoteTime.current);
      nextNote();
    }
  };

  const togglePlay = () => {
    if (!unlocked.current) {
      // play silent buffer to unlock the audio
      var buffer = audioContext.createBuffer(1, 1, 22050);
      var node = audioContext.createBufferSource();
      node.buffer = buffer;
      node.start(0);
      unlocked.current = true;
    }

    isMetronomeOn.current = !isMetronomeOn.current;

    if (isMetronomeOn.current) {
      // start playing
      current16thNote.current = 0;
      nextNoteTime.current = audioContext.currentTime;
      timerWorker.current.postMessage("start");
    } else {
      timerWorker.current.postMessage("stop");
    }
  };

  useEffect(() => {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    if (isMetronomeOn.current) togglePlay();
    setPlaying(false);
    setRecording(false);
    toggleRecordParent(false);
    togglePlayParent(false);

    timerWorker.current = new Worker(serviceWorker.getWorker);
    timerWorker.current.postMessage("stop");
    timerWorker.current.onmessage = function (e) {
      if (e.data === "tick") {
        scheduler();
      } else console.log("message: " + e.data);
    };
    timerWorker.current.postMessage({ interval: lookahead });
  }, [bpm]);

  const handleClickRecord = () => {
    if (!isMuted) togglePlay();
    if (isPlaying) {
      setPlaying(false);
      togglePlayParent(false);
    } else {
      setRecording(!isRecording);
      toggleRecordParent(!isRecording);
    }
  };

  const handleClickPlay = () => {
    if (!isMuted) togglePlay();
    if (isRecording) {
      setRecording(false);
      toggleRecordParent(false);
    } else {
      setPlaying(!isPlaying);
      togglePlayParent(!isPlaying);
    }
  };

  return (
    <Grid
      item
      container
      xs={4}
      sm={4}
      md={4}
      lg={4}
      xl={4}
      justify="flex-start"
      alignItems="center"
      className="soundBtn"
    >
      <Grid item xs={2} sm={2} md={2} lg={2} xl={3}>
        <RecordButton isRecording={isRecording} onClick={handleClickRecord} />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2} xl={3}>
        <PlayButton isPlaying={isPlaying} onClick={handleClickPlay} />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2} xl={3}>
        {isMuted ? (
          <ToggleOffIcon onClick={() => setMuted(false)} />
        ) : (
          <ToggleOnIcon onClick={() => setMuted(true)} />
        )}
      </Grid>
    </Grid>
  );
};

export default Metronome;

serviceWorker.register();

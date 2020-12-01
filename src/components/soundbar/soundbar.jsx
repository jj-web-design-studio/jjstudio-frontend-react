import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import AdjustIcon from '@material-ui/icons/Adjust';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import './soundbar.css';

const SoundBar = (props) => {
  const [ isRecording, setRecording ] = useState(false);
  const [ isPlaying, setPlaying ] = useState(false);
  const [ numRows, setRows ] = useState(1);

  const recordButton = (
    <div className="soundBtn">
      <AdjustIcon 
        color={ isRecording ? "secondary" : "" }
        onClick={() => {setRecording(!isRecording)}}
      />
    </div>
  )

  const playButton = (
    <div className="soundBtn">
      { isPlaying ?
      <StopIcon onClick={() => {setPlaying(!isPlaying)}} /> :
      <PlayCircleFilledIcon onClick={() => {setPlaying(!isPlaying)}} /> }
    </div>
  )
  
  const rowIncrementer = (
    <div className="soundBtn">
      <RemoveCircleIcon onClick={() => { numRows > 1 ? setRows(numRows - 1) : setRows(1) }} />
      Rows: {numRows}
      <AddCircleIcon onClick={() => { setRows(numRows + 1)}}/>
    </div>
  )

  const metronomeSlider = (
    <div className="soundBtn">
      Metronome
      {/*TODO: Figure out how to do metronome slider, might need to create separate component*/}
    </div>
  )

  return (
    <div className="soundBar">
      {recordButton}
      {playButton}
      {rowIncrementer}
      {metronomeSlider}
    </div>
  )

}

export default withRouter(SoundBar);
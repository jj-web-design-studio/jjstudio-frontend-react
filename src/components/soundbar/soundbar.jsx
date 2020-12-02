import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import AdjustIcon from '@material-ui/icons/Adjust';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import MetronomeSlider from './metronome_slider';
import './soundbar.css';

const SoundBar = (props) => {
  const [ isRecording, setRecording ] = useState(false);
  const [ isPlaying, setPlaying ] = useState(false);
  const [ numRows, setRows ] = useState(1);

  const playAndRecordButtons = (
    <div>
      <div className="soundBtn">
        <AdjustIcon 
          color={ isRecording ? "secondary" : "" }
          onClick={() => {setRecording(!isRecording)}}
        />
      </div>
      <div className="soundBtn">
        { isPlaying ?
        <StopIcon onClick={() => {setPlaying(!isPlaying)}} /> :
        <PlayCircleFilledIcon onClick={() => {setPlaying(!isPlaying)}} /> }
      </div>
    </div>
  )

  const rowIncrementer = (
    <div>
      <div className="soundBtn">
        <RemoveCircleIcon onClick={() => { numRows > 1 ? setRows(numRows - 1) : setRows(1) }} />
      </div>
      <div className="soundBtn">
        Rows: {numRows}
      </div>
      <div className="soundBtn">
        <AddCircleIcon onClick={() => { setRows(numRows + 1) }}/>
      </div>
    </div>
  )

  const metronomeSlider = (
    <div className="soundBtn">
      <MetronomeSlider />
      {/*TODO: Figure out how to do metronome slider, might need to create separate component*/}
    </div>
  )

  return (
    <div>
    <div className="soundBar">
      {playAndRecordButtons}
      {rowIncrementer}
      {metronomeSlider}
    </div>
    <div className={!isRecording ? "box" : "box animation"}>
    </div>
    </div>
  )
}

export default withRouter(SoundBar);
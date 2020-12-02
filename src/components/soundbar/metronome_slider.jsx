import React from 'react';
import Slider from '@material-ui/core/Slider';

const MetronomeSlider = (props) => {
  const [ bpm, setBPM ] = React.useState(120);

  const handleChange = (event, newBPM) => {
    console.log(bpm);
    setBPM(newBPM);
  };

  return (
    <div className="metronome slider soundBtn">
      <Slider 
        min={70}
        max={150}
        value={bpm} 
        onChange={handleChange} 
      />
      <div className="soundBtn">
        {bpm}
      </div>
    </div>
  );
}

export default MetronomeSlider;
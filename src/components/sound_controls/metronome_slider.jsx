import { useState } from 'react';
import Slider from '@material-ui/core/Slider';

const MetronomeSlider = (props) => {
  const [ bpm, setBPM ] = useState(120);

  const handleChange = (e, newBPM) => {
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
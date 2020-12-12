import { useState } from 'react';
import Slider from '@material-ui/core/Slider';

const BPMSlider = (props) => {
  const [ bpm, setBPM ] = useState(props.bpm);

  const handleChange = (e, newBpm) => {
    setBPM(newBpm);
    props.updateBpm(newBpm);
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

export default BPMSlider;
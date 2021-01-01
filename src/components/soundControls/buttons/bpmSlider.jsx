import { useEffect } from 'react';
import { connect } from "react-redux";
import Slider from '@material-ui/core/Slider';
import { setBpm } from "../../track/trackActions";

const BPMSlider = (props) => {
  const { bpm, setBpm } = props;

  const handleChange = (e, bpm) => {
    setBpm(bpm);
  };

  useEffect(() => {
    console.log(bpm);
  }, [bpm, setBpm]);

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

const mapStateToProps = (state) => {
  return {
    bpm: state.track.track.bpm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBpm: (bpm) => {
      dispatch(setBpm(bpm));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BPMSlider);

import { connect } from "react-redux";
import Slider from '@material-ui/core/Slider';
import { setBpm } from "../../../actions/trackActions";

import { Grid } from "@material-ui/core";

const BPMSlider = (props) => {
  const { bpm, setBpm } = props;

  const handleChange = (e, bpm) => {
    setBpm(bpm);
  };

  return (
    <Grid item container xs={4} sm={4} md={4} lg={4} xl={4} justify="flex-end" alignItems="center" className="soundBtn">
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
      <Slider 
        min={70}
        max={150}
        value={bpm} 
        onChange={handleChange}
        color="secondary" 
      />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2} xl={2} className="soundBtn">
        {bpm}
      </Grid>
    </Grid>
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

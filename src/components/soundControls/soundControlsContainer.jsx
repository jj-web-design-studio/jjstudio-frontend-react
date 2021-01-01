import { connect } from "react-redux";
import SoundControls from "./soundControls";
import { setBpm } from "../track/trackActions";

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

export default connect(mapStateToProps, mapDispatchToProps)(SoundControls);

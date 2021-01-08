import { connect } from "react-redux";
import SaveTrackButton from "../track/saveTrackButton";
import DeleteTrackButton from "../track/deleteTrackButton";
import { updateTrackName } from "../track/trackActions";

const TrackTitle = (props) => {
  const handleChange = (e, field) => {
    props.updateTrackName(e.currentTarget.value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} value={props.trackName} />
      <SaveTrackButton className="track-title-button" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trackName: state.track.track.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrackName: (name) => dispatch(updateTrackName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTitle);

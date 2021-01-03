import { connect } from "react-redux";
import { deleteTrackById, clearTrack } from "./trackActions";

const DeleteTrackButton = (props) => {
  const { trackId, deleteTrackById, clearTrack } = props;

  const handleClick = () => {
    deleteTrackById(trackId);
    clearTrack();
  };

  return (
    <button className="track-title-button" onClick={handleClick}>
      Delete
    </button>
  );
};

const mapStateToProps = (state) => {
  return {
    trackId: state.track.track.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTrackById: (id) => dispatch(deleteTrackById(id)),
    clearTrack: () => dispatch(clearTrack()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTrackButton);

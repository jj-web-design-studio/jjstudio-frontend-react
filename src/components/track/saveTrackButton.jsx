import { connect, useSelector } from "react-redux";

import { openModal } from "../common/modal/modalActions";
import { saveTrack } from "../track/trackActions";
import { LOGIN } from "../common/modal/modal";

const SaveTrackButton = (props) => {
  const { isAuthenticated, hasTrackId } = props;
  const track = useSelector((state) => state.track.track);

  const handleClick = (e) => {
    if (isAuthenticated) {
      props.saveTrack(track);
    } else {
      props.openModal(LOGIN);
    }
  };

  return (
    <button
      className="track-title-button"
      onClick={handleClick}
    >
      {hasTrackId ? "Update" : "Save"}
    </button>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
    hasTrackId: state.track.track.id != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    saveTrack: (trackName, track) => dispatch(saveTrack(trackName, track)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveTrackButton);

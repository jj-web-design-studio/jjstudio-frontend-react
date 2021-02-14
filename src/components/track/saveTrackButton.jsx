import { useState } from "react";
import { connect } from "react-redux";

import { openModal } from "../../actions/modalActions";
import { saveTrack } from "../../actions/trackActions";
import { LOGIN } from "../common/modal/modal";

import SaveIcon from "@material-ui/icons/Save";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

const SaveTrackButton = (props) => {
  const [isHovering, setHovering] = useState(false);
  const { isAuthenticated, track, saveTrack, openModal } = props;

  const handleClick = (e) => {
    if (isAuthenticated) {
      saveTrack(track);
    } else {
      openModal(LOGIN);
    }
  };

  return (
    <span
      className="track-title-button"
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {isHovering ? <SaveIcon /> : <SaveOutlinedIcon />}
    </span>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
    track: state.track.track
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    saveTrack: (trackName, track) => dispatch(saveTrack(trackName, track)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveTrackButton);

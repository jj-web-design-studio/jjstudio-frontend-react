import { useState } from "react";
import { connect, useSelector } from "react-redux";

import { openModal } from "../common/modal/modalActions";
import { saveTrack } from "../track/trackActions";
import { LOGIN } from "../common/modal/modal";

import SaveIcon from "@material-ui/icons/Save";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

const SaveTrackButton = (props) => {
  const [isHovering, setHovering] = useState(false);
  const { isAuthenticated, saveTrack, openModal } = props;
  const track = useSelector((state) => state.track.track);

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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    saveTrack: (trackName, track) => dispatch(saveTrack(trackName, track)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveTrackButton);

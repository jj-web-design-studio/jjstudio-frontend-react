import { connect, useSelector } from "react-redux";

import { openModal } from "../common/modal/modalActions";
import { LOGIN, SAVE_TRACK } from "../common/modal/modal";

const SaveTrackButton = (props) => {
  const trackName = useSelector((state) => state.track.track.name);
  const { isAuthenticated } = props;

  return (
    <button
      onClick={() => {
        props.openModal(isAuthenticated ? SAVE_TRACK : LOGIN);
      }}
    >
      Save
    </button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveTrackButton);

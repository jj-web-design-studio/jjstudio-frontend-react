import { connect } from "react-redux";

import { openModal } from "../common/modal/modalActions";
import { LOGIN, SAVE_TRACK } from "../common/modal/modal";

const SaveTrackButton = (props) => {
  const { isAuthenticated, hasTrackId } = props;

  return (
    <button
      className="track-title-button"
      onClick={() => {
        props.openModal(isAuthenticated ? SAVE_TRACK : LOGIN);
      }}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveTrackButton);

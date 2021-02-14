import { connect } from "react-redux";

import { openModal } from "../../actions/modalActions";
import { LOGIN, LOAD_TRACK } from "../common/modal/modal";

const LoadTrackButton = (props) => {
  const { isAuthenticated } = props;

  return (
    <button
      className="track-title-button"
      onClick={() => {
        props.openModal(isAuthenticated ? LOAD_TRACK : LOGIN);
      }}
    >
      Load
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadTrackButton);

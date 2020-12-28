import { connect } from "react-redux";

import { openModal } from "../../actions/modalActions";
import { LOGIN, SAVE_TRACK } from "../common/modal/modal";

const SaveTrackButton = (props) => {
  const { isAuthenticated } = props;

  return (
    <button
      onClick={() => {
        props.openModal(isAuthenticated ? SAVE_TRACK : LOGIN);
      }}
    >
      Save Track
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

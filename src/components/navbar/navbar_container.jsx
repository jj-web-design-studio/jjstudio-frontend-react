import { connect } from "react-redux";
import AppNavBar from "./navbar";
import { logout } from "../../actions/sessionActions";
import { openModal } from "../../actions/modalActions";

const mapStateToProps = (state) => {
  // let sessionId = state.session.id
  return {
    session: state.session.isAuthenticated,
  };
};
// will need this when they have a logged in usuer

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);

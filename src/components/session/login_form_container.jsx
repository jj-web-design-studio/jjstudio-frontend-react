import SessionForm from "./session_form";
import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/sessionActions";
import { openModal, closeModal } from "../../actions/modalActions";
import { SIGN_UP } from "../common/modal/modal";

const mapStateToProps = (state) => {
  let errors = state.errors.session;
  return {
    errors: errors,
    formType: "login",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    otherForm: () => dispatch(openModal(SIGN_UP)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);

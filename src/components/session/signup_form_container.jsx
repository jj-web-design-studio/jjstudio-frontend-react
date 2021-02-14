import { connect } from "react-redux";
import SessionForm from "./session_form";
import { signup, clearErrors } from "../../actions/sessionActions";
import { openModal, closeModal } from "../../actions/modalActions";
import { LOGIN } from "../common/modal/modal";

const mapStateToProps = (state, ownProps) => {
  let errors = state.errors.session;

  return {
    errors: errors,
    formType: "signup",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (form) => dispatch(signup(form)),
    clearErrors: () => dispatch(clearErrors()),
    otherForm: () => dispatch(openModal(LOGIN)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);

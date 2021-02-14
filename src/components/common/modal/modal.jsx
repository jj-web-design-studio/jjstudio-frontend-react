import React from "react";
import { closeModal } from "../../../actions/modalActions";
import { connect } from "react-redux";
import LoginFormContainer from "../../session/login_form_container";
import SignupFormContainer from "../../session/signup_form_container";
import LoadTrackForm from "../../track/loadTrackForm";
import ProTipKeyboardModal from "./proTipKeyboardModal";

export const LOGIN = "LOGIN";
export const SIGN_UP = "SIGN_UP";
export const LOAD_TRACK = "LOAD_TRACK";
export const PRO_TIP_KEYBOARD = "PRO_TIP_KEYBOARD";

const Modal = ({ modal, closeModal }) => {
  if (!modal) {
    return null;
  }
  let component = null;
  switch (modal) {
    case LOGIN:
      component = <LoginFormContainer />;
      break;
    case SIGN_UP:
      component = <SignupFormContainer />;
      break;
    case LOAD_TRACK:
      component = <LoadTrackForm />;
      break;
    case PRO_TIP_KEYBOARD:
      component = <ProTipKeyboardModal />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  if (!state.ui.modal) {
    return {
      modal: null,
    };
  } else {
    return {
      modal: state.ui.modal.modal,
      id: state.ui.modal.id,
    };
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

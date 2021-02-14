import { connect } from "react-redux";
import { deactivateProTipKeyboard } from "../../../actions/proTipActions";
import { closeModal } from "../../../actions/modalActions";

const ProTipKeyboardModal = (props) => {
  const handleClick = () => {
    props.closeModal();
    props.deactivateProTipKeyboard();
  };

  return (
    <div className="modal-content">
      <form className="modal-form">
        <div className="header-form">
          <h1>Pro Tip:</h1>
          <p>Don't click on the keys. Use your keyboard!</p>
        </div>
        <button onClick={handleClick}>Close</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    deactivateProTipKeyboard: () => dispatch(deactivateProTipKeyboard()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProTipKeyboardModal);

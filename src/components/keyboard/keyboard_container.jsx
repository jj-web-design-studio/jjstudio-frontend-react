import { connect } from "react-redux";
import Keyboard from "./keyboard";
import { loadKeyboardById, loadKeyboardNameList } from "../../actions/keyboard_actions";

const mapStateToProps = (state) => {
  // let sessionId = state.session.id
  return {
    mapping: state.keyboard.mapping
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadKeyboardMapping: (id) => dispatch(loadKeyboardById(id)),
    loadKeyboardNameList: () => dispatch(loadKeyboardNameList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);

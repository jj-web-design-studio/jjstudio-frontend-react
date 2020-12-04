import { connect } from "react-redux";
import Keyboard from "./keyboard";
import { loadDefaultKeyboard, loadKeyboardNameList } from "../../actions/keyboard_actions";

const mapStateToProps = (state) => {
  // let sessionId = state.session.id
  return {
    mapping: state.keyboard.mapping
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDefaultKeyboard: () => dispatch(loadDefaultKeyboard()),
    loadKeyboardNameList: () => dispatch(loadKeyboardNameList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);

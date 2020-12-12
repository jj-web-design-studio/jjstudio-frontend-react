import { connect } from "react-redux";
import Keyboard from "./keyboard";
import {
  loadKeyboardById,
  loadKeyboardNameList,
} from "../../actions/keyboard_actions";
import { loadSoundsByIds } from "../../actions/sound_actions";

const mapStateToProps = (state) => {
  return {
    mapping: state.keyboard.mapping,
    isAuthenticated: state.session.isAuthenticated,
    currentKeyboard: state.keyboard.currentKeyboardId,
    sounds: state.sounds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadKeyboardMapping: (id) => dispatch(loadKeyboardById(id)),
    loadKeyboardNameList: () => dispatch(loadKeyboardNameList()),
    loadSoundsByIds: (ids) => dispatch(loadSoundsByIds(ids)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);

import React from 'react';
import { connect } from "react-redux";
import Keyboard from './keyboard'
import { loadDefaultKeyboard } from '../../actions/keyboard_actions';

const mapStateToProps = (state) => {
  // let sessionId = state.session.id
  return ({
    keyboardName: state.keyboard.name,
    numRowMapping: state.keyboard.numRow,
    qweRowMapping: state.keyboard.qweRow,
    asdRowMapping: state.keyboard.asdRow,
    zxcRowMapping: state.keyboard.zxcRow,
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    loadDefaultKeyboard: (id) => dispatch(loadDefaultKeyboard(id)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard)
import React from 'react';
import { connect } from "react-redux";
import Keyboard from './keyboard'
import { loadDefaultKeyboard } from '../../actions/keyboard_actions';

const mapDispatchToProps = (dispatch) => {
  return ({
    loadDefaultKeyboard: (id) => dispatch(loadDefaultKeyboard(id)),
  })
}

export default connect(null, mapDispatchToProps)(Keyboard)
import * as KeyboardAPIUtil from "../util/keyboard_api_util";

export const RECEIVE_KEYBOARD_MAPPING = "RECEIVE_KEYBOARD_MAPPING";
export const RECEIVE_KEYBOARD_MAPPING_ERRORS = "RECEIVE_KEYBOARD_MAPPING_ERRORS";

// action creators
export const receiveKeyboardMapping = keyboardMapping => {
  return {
    type: RECEIVE_KEYBOARD_MAPPING,
    keyboardMapping
  }
}

export const receiveKeyboardMappingErrors = errors => {
  return {
    type: RECEIVE_KEYBOARD_MAPPING_ERRORS,
    errors
  }
}

// thunk action creators

export const loadKeyboard = id => dispatch => (
  KeyboardAPIUtil.getKeyboard(id).then((res) => {
      dispatch(receiveKeyboardMapping(res.data))
  }).catch(err => (
      dispatch(receiveKeyboardMappingErrors(err.data))
  ))
);

export const loadDefaultKeyboard = () => dispatch => (
  KeyboardAPIUtil.getDefaultKeyboard().then((res) => {
    debugger
    dispatch(receiveKeyboardMapping(res.data))
  }).catch(err => {
    dispatch(receiveKeyboardMappingErrors(err.data))
  })
);
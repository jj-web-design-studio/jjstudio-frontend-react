import * as KeyboardAPIUtil from "../util/keyboard_api_util";

export const RECEIVE_KEYBOARD_MAPPING = "RECEIVE_KEYBOARD_MAPPING";
export const RECEIVE_KEYBOARD_MAPPING_ERRORS =
  "RECEIVE_KEYBOARD_MAPPING_ERRORS";
export const RECEIVE_KEYBOARD_NAME_LIST = "RECIEVE_KEYBOARD_NAME_LIST";

// action creators
export const receiveKeyboardMapping = (keyboardMapping) => {
  return {
    type: RECEIVE_KEYBOARD_MAPPING,
    keyboardMapping,
  };
};

export const receiveKeyboardMappingErrors = (errors) => {
  return {
    type: RECEIVE_KEYBOARD_MAPPING_ERRORS,
    errors,
  };
};

export const receiveKeyboardNameList = (keyboardNameList) => {
  return {
    type: RECEIVE_KEYBOARD_NAME_LIST,
    keyboardNameList,
  };
};

// thunk action creators

export const loadKeyboardById = (id) => (dispatch) =>
  KeyboardAPIUtil.getKeyboardById(id)
    .then((res) => {
      dispatch(receiveKeyboardMapping(res.data));
    })
    .catch((err) => dispatch(receiveKeyboardMappingErrors(err.data)));

export const loadDefaultKeyboard = () => (dispatch) =>
  KeyboardAPIUtil.getDefaultKeyboard()
    .then((res) => {
      dispatch(receiveKeyboardMapping(res.data));
    })
    .catch((err) => {
      dispatch(receiveKeyboardMappingErrors(err.data));
    });

export const loadKeyboardNameList = () => (dispatch) =>
  KeyboardAPIUtil.getKeyboardNameList()
    .then((res) => {
      let keyboardNameList = [];
      for (var i = 0; i < res.data.length; i++) {
        keyboardNameList.push(res.data[i].name);
      }
      dispatch(receiveKeyboardNameList(keyboardNameList));
    })
    .catch((err) => {
      // do something
    });

import { RECEIVE_KEYBOARD_MAPPING, RECEIVE_KEYBOARD_NAME_LIST } from '../components/keyboard/keyboardActions';

function KeyboardReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_KEYBOARD_MAPPING:
      return {
        ...state,
        mapping: action.keyboardMapping
      }
    case RECEIVE_KEYBOARD_NAME_LIST:
      return {
        ...state,
        nameList: action.keyboardNameList
      }
    default:
      return state;
  }
}

export default KeyboardReducer;
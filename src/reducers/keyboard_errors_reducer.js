import { RECEIVE_KEYBOARD_MAPPING_ERRORS, RECEIVE_KEYBOARD_MAPPING } from '../actions/keyboard_actions';

let nullErrors = [];

function KeyboardErrorReducer(state = {}, action) {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_KEYBOARD_MAPPING_ERRORS:
      nextState = action.errors;
      return nextState;
    case RECEIVE_KEYBOARD_MAPPING:
      return nullErrors;
    default:
      return state;
  }
}

export default KeyboardErrorReducer;
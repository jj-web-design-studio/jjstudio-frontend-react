import { RECEIVE_KEYBOARD_MAPPING } from '../actions/keyboard_actions';

function KeyboardReducer(state = {}, action) {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_KEYBOARD_MAPPING:
      nextState = action.keyboardMapping;
      return nextState;
    default:
      return state;
  }
}

export default KeyboardReducer;
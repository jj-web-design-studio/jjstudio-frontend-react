import { RECEIVE_SOUNDS, RECEIVE_SOUNDS_ERRORS } from "../actions/soundActions";

function SoundReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_SOUNDS:
      return {
        ...state,
        sounds: action.sounds
      }
    case RECEIVE_SOUNDS_ERRORS:
      return {
        ...state,
        errors: action.errors
      }
    default:
      return state;
  }
}

export default SoundReducer;
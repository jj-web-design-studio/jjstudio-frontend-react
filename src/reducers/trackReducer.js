import {
  RECEIVE_SAVE_TRACK,
  RECEIVE_LOAD_TRACK,
  SET_BPM,
} from "../components/track/trackActions";

function TrackReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_SAVE_TRACK:
      return {
        ...state,
        track: action.track,
      };
    case RECEIVE_LOAD_TRACK:
      return {
        ...state,
        track: action.track,
      };
    case SET_BPM:
      return {
        ...state,
        track: {
          ...state.track,
          bpm: action.bpm,
        },
      };
    default:
      return state;
  }
}

export default TrackReducer;

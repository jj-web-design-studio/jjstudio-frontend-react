import { RECEIVE_SAVE_TRACK, RECEIVE_LOAD_TRACK } from "../components/track/trackActions";

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
    default:
      return state;
  }
}

export default TrackReducer;

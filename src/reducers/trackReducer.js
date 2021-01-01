import {
  RECEIVE_SAVE_TRACK,
  RECEIVE_LOAD_TRACK,
  SET_BPM,
  INCREMENT_ROW_COUNT,
  DECREMENT_ROW_COUNT
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
    case INCREMENT_ROW_COUNT:
    case DECREMENT_ROW_COUNT:
      return {
        ...state,
        track: {
          ...state.track,
          rowCount: action.rowCount,
        }
      }
    default:
      return state;
  }
}

export default TrackReducer;

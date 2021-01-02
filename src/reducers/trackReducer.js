import {
  RECEIVE_SAVE_TRACK,
  RECEIVE_LOAD_TRACK,
  SET_BPM,
  INCREMENT_ROW_COUNT,
  DECREMENT_ROW_COUNT,
  ADD_NOTE_TO_SOUND_ROW,
  UPDATE_SOUND_ROW,
  UPDATE_TRACK_NAME,
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
    case UPDATE_TRACK_NAME:
      return {
        ...state,
        track: {
          ...state.track,
          name: action.name,
        },
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
      return {
        ...state,
        track: {
          ...state.track,
          rowCount: action.rowCount,
          contents: [...state.track.contents, []],
        },
      };
    case DECREMENT_ROW_COUNT:
      return {
        ...state,
        track: {
          ...state.track,
          rowCount: action.rowCount,
          contents: [
            ...state.track.contents.slice(0, state.track.contents.length - 1),
          ],
        },
      };
    case ADD_NOTE_TO_SOUND_ROW:
      return {
        ...state,
        track: {
          ...state.track,
          contents: [
            ...state.track.contents.slice(0, action.note.rowIndex),
            [...state.track.contents[action.note.rowIndex], action.note],
            ...state.track.contents.slice(
              action.note.rowIndex + 1,
              state.track.contents.length
            ),
          ],
        },
      };
    case UPDATE_SOUND_ROW:
      return {
        ...state,
        track: {
          ...state.track,
          contents: [
            ...state.track.contents.slice(0, action.rowIndex),
            action.soundRow,
            ...state.track.contents.slice(
              action.rowIndex + 1,
              state.track.contents.length
            ),
          ],
        },
      };
    default:
      return state;
  }
}

export default TrackReducer;

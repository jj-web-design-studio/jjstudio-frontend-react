import * as TrackAPIUtil from "./trackAPIUtil";
import { closeModal } from "../common/modal/modalActions";
import { receiveErrors } from "../session/sessionActions";

export const RECEIVE_SAVE_TRACK = "RECEIVE_SAVE_TRACK";
export const RECEIVE_LOAD_TRACK = "RECEIVE_LOAD_TRACK";
export const UPDATE_TRACK_NAME = "UPDATE_TRACK_NAME";
export const SET_BPM = "SET_BPM";
export const INCREMENT_ROW_COUNT = "INCREMENT_ROW_COUNT";
export const DECREMENT_ROW_COUNT = "DECREMENT_ROW_COUNT";
export const ADD_NOTE_TO_SOUND_ROW = "ADD_NOTE_TO_SOUND_ROW";
export const UPDATE_SOUND_ROW = "UPDATE_SOUND_ROW";
export const CLEAR_TRACK = "CLEAR_TRACK";
export const DELETE_TRACK = "DELETE_TRACK";

export const updateTrackName = (name) => ({
  type: UPDATE_TRACK_NAME,
  name,
});

export const setBpm = (bpm) => ({
  type: SET_BPM,
  bpm,
});

export const incrementRowCount = (rowCount) => {
  rowCount++;
  return {
    type: INCREMENT_ROW_COUNT,
    rowCount,
  };
};

export const decrementRowCount = (rowCount) => {
  rowCount--;
  return {
    type: DECREMENT_ROW_COUNT,
    rowCount,
  };
};

export const addNoteToSoundRow = (note) => ({
  type: ADD_NOTE_TO_SOUND_ROW,
  note,
});

export const updateSoundRow = (soundRow, rowIndex) => ({
  type: UPDATE_SOUND_ROW,
  soundRow,
  rowIndex,
});

export const receiveLoadTrack = (track) => ({
  type: RECEIVE_LOAD_TRACK,
  track,
});

export const clearTrack = () => ({
  type: CLEAR_TRACK,
});

export const saveTrack = (track) => (dispatch) => {
  return TrackAPIUtil.saveTrack(track)
    .then((res) => {      
      dispatch(loadTrack(res.data));
      dispatch(closeModal());
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });
};

export const loadTrack = (id) => (dispatch) => {
  return TrackAPIUtil.getTrackById(id)
    .then((res) => {
      dispatch(receiveLoadTrack(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTrackById = (id) => (dispatch) => {
  return TrackAPIUtil.deleteTrackById(id).then((res) => {
    dispatch(closeModal());
  }).catch((err) => {
    console.log(err);
  })
}

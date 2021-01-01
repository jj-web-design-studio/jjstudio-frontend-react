import * as TrackAPIUtil from "./trackAPIUtil";

export const RECEIVE_SAVE_TRACK = "RECEIVE_SAVE_TRACK";
export const RECEIVE_LOAD_TRACK = "RECEIVE_LOAD_TRACK";
export const SET_BPM = "SET_BPM";
export const INCREMENT_ROW_COUNT = "INCREMENT_ROW_COUNT";
export const DECREMENT_ROW_COUNT = "DECREMENT_ROW_COUNT";
export const ADD_NOTE_TO_SOUND_ROW = "ADD_NOTE_TO_SOUND_ROW";
export const UPDATE_SOUND_ROW = "UPDATE_SOUND_ROW";

// export const receiveSaveTrack = (track) => {

// }

export const receiveLoadTrack = (track) => ({
  type: RECEIVE_LOAD_TRACK,
  track,
});

export const setBpm = (bpm) => {
  return {
    type: SET_BPM,
    bpm,
  };
};

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

export const addNoteToSoundRow = (note) => {
  return {
    type: ADD_NOTE_TO_SOUND_ROW,
    note,
  };
};

export const updateSoundRow = (soundRow, rowIndex) => {
  return {
    type: UPDATE_SOUND_ROW,
    soundRow,
    rowIndex,
  };
};

export const saveTrack = (track) => {
  return TrackAPIUtil.saveTrack(track)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
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

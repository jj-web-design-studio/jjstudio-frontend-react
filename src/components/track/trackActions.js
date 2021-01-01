import * as TrackAPIUtil from "./trackAPIUtil";

export const RECEIVE_SAVE_TRACK = "RECEIVE_SAVE_TRACK";
export const RECEIVE_LOAD_TRACK = "RECEIVE_LOAD_TRACK";
export const SET_BPM = "SET_BPM";

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
      console.log(res);
      dispatch(receiveLoadTrack(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

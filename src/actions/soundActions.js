import * as SoundAPIUtil from "../util/soundAPIUtil";

export const RECEIVE_SOUNDS = "RECEIVE_SOUNDS";
export const RECEIVE_SOUNDS_ERRORS = "RECEIVE_SOUNDS_ERRORS";

// action creators
export const receiveSounds = (sounds) => {
  return {
    type: RECEIVE_SOUNDS,
    sounds,
  };
};

export const receiveSoundsError = (errors) => {
  return {
    type: RECEIVE_SOUNDS_ERRORS,
    errors,
  };
};

// thunk action creators
export const loadSoundsByIds = (ids) => (dispatch) => {
  return SoundAPIUtil.getSoundByIds(ids)
    .then((res) => {
      dispatch(receiveSounds(res.data));
    })
    .catch((err) => {
      dispatch(receiveSoundsError(err.data));
    });
};

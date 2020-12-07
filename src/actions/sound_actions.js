import * as SoundAPIUtil from "../util/sound_api_util";

export const RECEIVE_SOUNDS = "RECEIVE_SOUNDS";
export const RECEIVE_SOUNDS_ERRORS = "RECEIVE_SOUNDS_ERRORS";

// action creators
export const receiveSounds = (sounds) => {
  debugger
  return {
    type: RECEIVE_SOUNDS,
    sounds,
  };
};

export const receiveSoundsError = (errors) => {
  return {
    type: RECEIVE_SOUNDS_ERROR,
    errors,
  };
};

// thunk action creators
export const loadSoundsByIds = (ids) => (dispatch) => {
  SoundAPIUtil.getSoundByIds(ids)
    .then((res) => {
      dispatch(receiveSounds(res.data));
    })
    .catch((err) => {
      dispatch(receiveSoundsError(err.data));
    });
};

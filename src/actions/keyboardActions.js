import * as KeyboardAPIUtil from "../util/keyboardAPIUtil";
import * as SoundAPIUtil from "../util/soundAPIUtil";

export const RECEIVE_KEYBOARD_MAPPING = "RECEIVE_KEYBOARD_MAPPING";
export const RECEIVE_KEYBOARD_MAPPING_ERRORS =
  "RECEIVE_KEYBOARD_MAPPING_ERRORS";
export const RECEIVE_KEYBOARD_NAME_LIST = "RECIEVE_KEYBOARD_NAME_LIST";
export const RECEIVE_KEYBOARD_NAME_LIST_ERRORS =
  "RECEIVE_KEYBOARD_NAME_LIST_ERRORS";

// action creators
export const receiveKeyboardMapping = (keyboardMapping) => {
  return {
    type: RECEIVE_KEYBOARD_MAPPING,
    keyboardMapping,
  };
};

export const receiveKeyboardMappingErrors = (errors) => {
  return {
    type: RECEIVE_KEYBOARD_MAPPING_ERRORS,
    errors,
  };
};

export const receiveKeyboardNameList = (keyboardNameList) => {
  return {
    type: RECEIVE_KEYBOARD_NAME_LIST,
    keyboardNameList,
  };
};

export const receiveKeyboardNameListErrors = (errors) => {
  return {
    type: RECEIVE_KEYBOARD_NAME_LIST_ERRORS,
    errors,
  };
};

// thunk action creators
export const loadDefaultKeyboard = () => (dispatch) => {
  KeyboardAPIUtil.getDefaultKeyboard().then((res) => {
    let keyboard = res.data;
      let ids = extractUniqueSoundIds(keyboard);
      SoundAPIUtil.getSoundsByIds(ids)
        .then((res) => {
          let sounds = soundArrayToMap(res.data);
          addAudioToKeys(keyboard.numRow, sounds);
          addAudioToKeys(keyboard.qweRow, sounds);
          addAudioToKeys(keyboard.asdRow, sounds);
          addAudioToKeys(keyboard.zxcRow, sounds);
          dispatch(receiveKeyboardMapping(keyboard));
        })
        .catch((err) => {
          dispatch(receiveKeyboardMappingErrors(err.data));
        });
  }).catch((err) => {
    dispatch(receiveKeyboardMappingErrors(err.data));
  })
};

export const loadKeyboardById = (id) => (dispatch) =>
  KeyboardAPIUtil.getKeyboardById(id)
    .then((res) => {
      let keyboard = res.data;
      let ids = extractUniqueSoundIds(keyboard);
      SoundAPIUtil.getSoundsByIds(ids)
        .then((res) => {
          let sounds = soundArrayToMap(res.data);
          addAudioToKeys(keyboard.numRow, sounds);
          addAudioToKeys(keyboard.qweRow, sounds);
          addAudioToKeys(keyboard.asdRow, sounds);
          addAudioToKeys(keyboard.zxcRow, sounds);
          dispatch(receiveKeyboardMapping(keyboard));
        })
        .catch((err) => {
          dispatch(receiveKeyboardMappingErrors(err.data));
        });
    })
    .catch((err) => {
      dispatch(receiveKeyboardMappingErrors(err.data));
    });

export const loadKeyboardNameList = () => (dispatch) =>
  KeyboardAPIUtil.getKeyboardNameList()
    .then((res) => {
      let keyboardNameList = [];
      for (var i = 0; i < res.data.length; i++) {
        keyboardNameList.push(res.data[i].name);
      }
      dispatch(receiveKeyboardNameList(keyboardNameList));
    })
    .catch((err) => {
      dispatch(receiveKeyboardNameListErrors(err.data));
    });

function extractUniqueSoundIds(keyboard) {
  let ids = new Set();
  keyboard.numRow.forEach((key) => {
    ids.add(key.soundId);
  });
  keyboard.qweRow.forEach((key) => {
    ids.add(key.soundId);
  });
  keyboard.asdRow.forEach((key) => {
    ids.add(key.soundId);
  });
  keyboard.zxcRow.forEach((key) => {
    ids.add(key.soundId);
  });
  return ids;
}

function soundArrayToMap(soundArray) {
  let sounds = new Map();
  soundArray.forEach((sound) => {
    let data = {};
    data.name = sound.name;
    data.audio = new Audio("data:audio/wav;base64," + sound.file.data);
    sounds.set(sound.id, data);
  });
  return sounds;
}

function addAudioToKeys(keyRow, sounds) {
  keyRow.forEach((key) => {
    key.sound = sounds.get(key.soundId);
  });
}

import axios from "axios";

export const getDefaultKeyboard = () => {
  return axios.get("/v1/keyboards/default");
};

export const getKeyboardById = (id) => {
  return axios.get("/v1/me/keyboards/" + id);
};

export const getKeyboardNameList = () => {
  return axios.get("/v1/me/keyboards");
};

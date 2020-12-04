import axios from "axios";

export const getKeyboardById = (id) => {
  return axios.get("/v1/me/keyboards/" + id);
}

export const getDefaultKeyboard = () => {
  return axios.get("/v1/me/keyboards/default");
}

export const getKeyboardNameList = () => {
  return axios.get("/v1/me/keyboards");
}
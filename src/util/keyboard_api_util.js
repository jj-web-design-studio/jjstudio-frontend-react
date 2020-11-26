import axios from "axios";

export const getKeyboard = (id) => {
  return axios.get("/v1/me/keyboards/" + id);
}

export const getDefaultKeyboard = () => {
  return axios.get("/v1/me/keyboards/default");
}
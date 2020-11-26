import axios from "axios";

export const getKeyboard = (id) => {
  return axios.get("http://localhost:8080/v1/me/keyboards/" + id);
}

export const getDefaultKeyboard = () => {
  return axios.get("http://localhost:8080/v1/me/keyboards/default");
}
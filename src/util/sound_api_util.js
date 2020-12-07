import axios from "axios";

export const getSoundById = (id) => {
  return axios.get("/v1/me/sounds/" + id);
};

export const getSoundByIds = (ids) => {
  debugger
  const params = {
    "ids": ids
  }
  return axios.get("/v1/me/sounds?ids=5fcadb14d62a7b2f68b3cb27,5fcadf1dd62a7b2f68b3cb28");
};

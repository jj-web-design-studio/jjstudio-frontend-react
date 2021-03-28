import axios from "axios";

export const getSoundById = (id) => {
  return axios.get("/v1/me/sounds/" + id);
};

export const getSoundsByIds = (ids) => {
  let idQueryString = "";
  for (let i = 0; i < ids.length; i++) {
    idQueryString += ids[i]
    if (i !== ids.length - 1) {
      idQueryString += ",";
    }
  }
  const params = {
    ids: idQueryString
  }
  return axios.get("/v1/me/sounds", { params } );
};

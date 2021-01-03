import axios from "axios";

export const getTrackById = (id) => {
  return axios.get("/v1/me/tracks/" + id);
};

export const getAllTracks = () => {
  return axios.get("/v1/me/tracks");
};

export const saveTrack = (data) => {
  return axios.post("/v1/me/tracks", data);
};

export const updateTrack = (data) => {
  return axios.put("/v1/me/tracks", data);
};

export const deleteTrackById = (id) => {
  return axios.delete("/v1/me/tracks/" + id);
};

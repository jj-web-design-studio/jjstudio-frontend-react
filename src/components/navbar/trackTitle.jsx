import { useState } from "react";
import { useSelector } from "react-redux";
import SaveTrackButton from "../track/saveTrackButton";
import LoadTrackButton from "../track/loadTrackButton";

const TrackTitle = (props) => {
  const trackName = useSelector((state) => state.track.track.name);

  return (
    <div>
      {!isNewTrack(trackName) ? (
        <div>
          <span>{trackName}</span>
          <SaveTrackButton />
          <button>Delete</button>
        </div>
      ) : (
        <>
          Unnamed Track
          <SaveTrackButton />
          <LoadTrackButton />
        </>
      )}
    </div>
  );
};

const isNewTrack = (trackName) => {
  return !trackName || trackName === "";
};

export default TrackTitle;

import { useState } from "react";
import { useSelector } from "react-redux";
import SaveTrackButton from "../track/saveTrackButton";
import LoadTrackButton from "../track/loadTrackButton";

const TrackTitle = (props) => {
  const trackName = useSelector((state) => state.track.track.name);
  const [isHovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  return (
    <div>
      {!isNewTrack(trackName) ? (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {isHovering ? (
            <div>
              <SaveTrackButton />
              <button>Delete</button>
            </div>
          ) : (
            <span>{trackName}</span>
          )}
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

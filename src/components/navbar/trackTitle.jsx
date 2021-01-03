import { useSelector } from "react-redux";
import SaveTrackButton from "../track/saveTrackButton";
import LoadTrackButton from "../track/loadTrackButton";
import DeleteTrackButton from "../track/deleteTrackButton";

const TrackTitle = (props) => {
  const trackName = useSelector((state) => state.track.track.name);

  return (
    <div>
      {!isNewTrack(trackName) ? (
        <div>
          <span>{trackName}</span>
          <SaveTrackButton className="track-title-button" />
          <DeleteTrackButton className="track-title-button"/>
        </div>
      ) : (
        <>
          Unnamed Track
          <SaveTrackButton className="track-title-button"/>
          <LoadTrackButton className="track-title-button"/>
        </>
      )}
    </div>
  );
};

const isNewTrack = (trackName) => {
  return !trackName || trackName === "";
};

export default TrackTitle;

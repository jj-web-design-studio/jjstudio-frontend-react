import { useState } from "react";
import { connect } from "react-redux";
import SaveTrackButton from "../track/saveTrackButton";
import DeleteTrackButton from "../track/deleteTrackButton";
import { updateTrackName } from "../track/trackActions";

const TrackTitle = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const { isNewTrack, trackName, trackContents } = props;

  const isEmptyTrack = () => {
    for (let i = 0; i < trackContents.length; i++) {
      if (trackContents[i].length > 0) return false;
    }
    return true;
  };

  const handleChange = (e) => {
    props.updateTrackName(e.currentTarget.value);
  };

  const shouldBeBlank = () => {
    return isNewTrack && isEmptyTrack();
  };

  const shoulderRenderInput = () => {
    return (isNewTrack && !isEmptyTrack()) || isEditing;
  };

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {shouldBeBlank() ? (
        <></>
      ) : shoulderRenderInput() ? (
        <>
          <input type="text" placeholder="Name this track..." onChange={handleChange} value={trackName} />
          <span
            onClick={() => {
              setEditing(false);
              setHovering(false);
            }}
          >
            {" "}
            <SaveTrackButton />
          </span>
        </>
      ) : isHovering ? (
        <>
          <button onClick={() => setEditing(true)}>Edit</button>
          <DeleteTrackButton />
        </>
      ) : (
        props.trackName
      )}
    </div>
  );
};

// {isHovering ? (
//   <>
//     <button>Edit</button>
//     <DeleteTrackButton />
//   </>
// ) : (
//   <>
//     <input type="text" onChange={handleChange} value={props.trackName} />
//     {props.hasTrackId ? <></> : <SaveTrackButton className="track-title-button" />}
//   </>
// )}

const mapStateToProps = (state) => {
  return {
    trackName: state.track.track.name,
    trackContents: state.track.track.contents,
    isNewTrack: state.track.track.id === undefined,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrackName: (name) => dispatch(updateTrackName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackTitle);

import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { closeModal } from "../common/modal/modalActions";
import { saveTrack, updateTrackName } from "./trackActions";

const SaveTrackForm = (props) => {
  const track = useSelector((state) => state.track.track);
  const [trackName, setTrackName] = useState("");
  const [trackNameError, setTrackNameError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateTrackName(trackName);
    props.saveTrack(track);
    props.closeModal();
  };

  const handleInput = (e) => {
    setTrackName(e.currentTarget.value);
  };

  const handleBlur = () => {
    setTrackNameError(trackName === "");
  };

  return (
    <div className="login-form-container">
      <form className="login-form-box" onSubmit={handleSubmit}>
        <div className="header-form">
          <h1>J J | S T U D I O</h1>
          <p>Save your track</p>
        </div>
        <label className="input-field">
          Track Name:
          <input
            type="text"
            className={trackNameError ? "form-field-error" : ""}
            onChange={handleInput}
            value={trackName}
            onBlur={handleBlur}
          />
        </label>
        <input type="submit" value="Save" id="submit-button" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    track: state.track.track,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveTrack: (track) => dispatch(saveTrack(track)),
    closeModal: () => dispatch(closeModal()),
    updateTrackName: (name) => dispatch(updateTrackName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveTrackForm);

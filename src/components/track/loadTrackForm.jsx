import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { closeModal } from "../common/modal/modalActions";
import { loadTrack } from "./trackActions";
import * as TrackAPIUtil from "./trackAPIUtil";
import List from "../common/list/list";

const LoadTrackForm = (props) => {
  const [currentTrackId, setCurrentTrackId] = useState("");
  const [tracks, setTracks] = useState([]);
  const [isFailed, setFailed] = useState(false);
  const {loadTrack, closeModal} = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    loadTrack(currentTrackId).then(() => {closeModal()});
  };

  useEffect(() => {
    TrackAPIUtil.getAllTracks()
      .then((res) => {
        setTracks(res.data);
      })
      .catch((err) => {
        console.log(err);
        setFailed(true);
      });
  }, []);

  return (
    <div className="modal-content">
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="header-form">
          <h1>J J | S T U D I O</h1>
          <p>
            {isFailed
              ? "Failed to load track"
              : tracks.length === 0
              ? "No tracks found!"
              : "Load a track"}
          </p>
        </div>

        <List items={getTrackNames(tracks)} setSelectedItem={(id) => {setCurrentTrackId(id)}}/>

        <input type="submit" value="Load" id="submit-button" />
      </form>
    </div>
  );
};

const getTrackNames = (tracks) => {
  return tracks.map((track) => ({
    label: track.name,
    id: track.id,
  }));
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTrack: (id) => dispatch(loadTrack(id)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadTrackForm);

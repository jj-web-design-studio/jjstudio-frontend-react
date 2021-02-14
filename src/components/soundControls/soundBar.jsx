import { useState, useEffect, useCallback } from "react";
import { useSelector, connect } from "react-redux";

import { isPlayableKey } from "../keyboard/keys";
import Note from "./note";
import {
  addNoteToSoundRow,
  updateSoundRow,
  deleteNoteFromRow,
} from "../../actions/trackActions";

import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

var noteId = 0;

const SoundBar = (props) => {
  const modal = useSelector((state) => state.ui.modal);
  const {
    trackContents,
    addNoteToSoundRow,
    updateSoundRow,
    deleteNoteFromRow,
  } = props;

  const [isHoveringOptions, setHoveringOptions] = useState(false);
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const { rowIndex, isSelected, isRecording, windowWidth } = props;

  const useStyles = makeStyles({
    moreHorizStyle: {
      position: "absolute",
      left: 98 + "%",
      opacity: isHoveringOptions ? 1 : 0.5,
    },
  });
  const classes = useStyles();

  const updateLeft = (index, left) => {
    var updatedTrackContents = trackContents.map(function (arr) {
      return arr.slice();
    });

    updatedTrackContents[rowIndex][index].left = left;
    updateSoundRow(updatedTrackContents[rowIndex], rowIndex);
  };

  const deleteNote = (noteIndex) => {
    deleteNoteFromRow(noteIndex, rowIndex);
  };

  const shouldRender = useCallback(
    (keyCode) => {
      return isSelected && isRecording && !modal && isPlayableKey(keyCode);
    },
    [isSelected, isRecording, modal]
  );

  const handleUserKeyDown = useCallback(
    (e) => {
      if (!shouldRender(e.keyCode)) return;

      e.preventDefault();
      if (e.keyCode === 16 || e.keyCode === 32) return;
      const recordingLine = document.getElementById("recording-line");
      const calculatedLeft = window
        .getComputedStyle(recordingLine)
        .getPropertyValue("left");
      const calculatedLeftCleaned = calculatedLeft.slice(
        0,
        calculatedLeft.length - 2
      );

      addNoteToSoundRow({
        left: (calculatedLeftCleaned / windowWidth) * 100,
        soundId: null,
        rowIndex: rowIndex,
        color: "green",
        label: e.key,
      });
    },
    [shouldRender, windowWidth, addNoteToSoundRow, rowIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyDown);

    return () => {
      window.removeEventListener("keydown", handleUserKeyDown);
    };
  }, [handleUserKeyDown, trackContents, rowIndex]);

  return (
    <div className={isSelected ? "sound-bar" : "sound-bar selected"}>
      {trackContents[rowIndex].map((sound, index) => {
        console.log(trackContents);
        return (
          <Note
            key={noteId++}
            rowIndex={rowIndex}
            noteIndex={index}
            left={sound.left}
            color={sound.color}
            label={sound.label}
            windowWidth={windowWidth}
            updateLeftInParent={updateLeft}
            deleteNote={deleteNote}
          />
        );
      })}
      <MoreHorizIcon
        className={classes.moreHorizStyle}
        onMouseEnter={() => setHoveringOptions(true)}
        onMouseLeave={() => setHoveringOptions(false)}
        onClick={() => setOptionsOpen(true)}
      />
      {isOptionsOpen ? <div>
        <div>Clear</div>
        <div>Delete</div>
      </div> : <></>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trackContents: state.track.track.contents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNoteToSoundRow: (note) => {
      dispatch(addNoteToSoundRow(note));
    },
    updateSoundRow: (soundRow, rowIndex) => {
      dispatch(updateSoundRow(soundRow, rowIndex));
    },
    deleteNoteFromRow: (noteIndex, rowIndex) => {
      dispatch(deleteNoteFromRow(noteIndex, rowIndex));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundBar);

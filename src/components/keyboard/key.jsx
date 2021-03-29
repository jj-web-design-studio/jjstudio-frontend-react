import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions/modalActions";
import { PRO_TIP_KEYBOARD } from "../common/modal/modal";
import { Grid } from "@material-ui/core";
import {
  NUM_ROW_INDEX,
  QWE_ROW_INDEX,
  ASD_ROW_INDEX,
  ZXC_ROW_INDEX,
} from "./keys";

const isLeftMouseClick = (e) => {
  return e.button === 0;
};

const Key = (props) => {
  const { isAuthenticated, isModalOpen, shouldPromptProTipKeyboard } = props;
  const { openModal } = props;
  const { keyCode, label, soundLabel, keyRowIndex, audio } = props;

  const [isPlaying, setPlaying] = useState(false);

  const handleClick = (e) => {
    if (shouldPromptProTipKeyboard && !isAuthenticated) {
      openModal(PRO_TIP_KEYBOARD);
    }
  };

  const handleUserKeyDown = useCallback(
    (e) => {
      if (isModalOpen) return;

      if (e.keyCode === keyCode) {
        setPlaying(true);
        if (!isPlaying) audio.play();
      }
    },
    [isModalOpen, isPlaying, keyCode, audio]
  );

  const handleUserKeyUp = useCallback(
    (e) => {
      if (isModalOpen) return;

      if (e.keyCode === keyCode) {
        setPlaying(false);
      }
    },
    [isModalOpen, keyCode]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyDown);
    window.addEventListener("keyup", handleUserKeyUp);

    return () => {
      window.removeEventListener("keydown", handleUserKeyDown);
      window.removeEventListener("keyup", handleUserKeyUp);
    };
  }, [handleUserKeyDown, handleUserKeyUp]);

  const getKeyClassName = (keyRowIndex) => {
    switch (keyRowIndex) {
      case NUM_ROW_INDEX:
        return isPlaying ? "key numRow active" : "key numRow";
      case QWE_ROW_INDEX:
        return isPlaying ? "key qweRow active" : "key qweRow";
      case ASD_ROW_INDEX:
        return isPlaying ? "key asdRow active" : "key asdRow";
      case ZXC_ROW_INDEX:
        return isPlaying ? "key zxcRow active" : "key zxcRow";
      default:
        return isPlaying ? "key active " : "key";
    }
  };

  return (
    <Grid
      item
      xs={1}
      sm={1}
      md={1}
      lg={1}
      xl={1}
      color="secondary"
      onMouseDown={(e) => {
        setPlaying(isLeftMouseClick(e) ? true : false);
      }}
      onMouseUp={() => {
        setPlaying(false);
      }}
      onMouseLeave={() => {
        setPlaying(false);
      }}
      onClick={handleClick}
    >
      <div className={getKeyClassName(keyRowIndex)}>
        <div className="key-label">{label}</div>
        <div className="sound-label">{soundLabel}</div>
      </div>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
    isModalOpen: state.ui.modal !== null,
    shouldPromptProTipKeyboard: state.ui.proTip.shouldPromptProTipKeyboard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Key);

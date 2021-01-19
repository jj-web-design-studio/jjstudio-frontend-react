import { useCallback, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { openModal } from "../common/modal/modalActions";
import { PRO_TIP_KEYBOARD } from "../common/modal/modal";
import { Grid } from "@material-ui/core";

const isLeftMouseClick = (e) => {
  return e.button === 0;
};

const Key = (props) => {
  const modal = useSelector((state) => state.ui.modal);
  const shouldPromptProTipKeyboard = useSelector(
    (state) => state.ui.proTip.shouldPromptProTipKeyboard
  );
  const { openModal, isAuthenticated } = props;
  const [isPlaying, setPlaying] = useState(false);

  const handleClick = (e) => {
    if (shouldPromptProTipKeyboard && !isAuthenticated) {
      openModal(PRO_TIP_KEYBOARD);
    }
  };


  const handleUserKeyDown = useCallback(
    (e) => {
      if (modal !== null) return;

      if (e.keyCode == props.keyCode) {
        const audio = new Audio("/clap.wav");
        setPlaying(true);
        if (!isPlaying) audio.play();
      }
    },
    [modal, props, isPlaying]
  );

  const handleUserKeyUp = useCallback(
    (e) => {
      if (modal) return;

      if (e.keyCode == props.keyCode) {
        setPlaying(false);
      }
    },
    [modal, props]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyDown);
    window.addEventListener("keyup", handleUserKeyUp);

    return () => {
      window.removeEventListener("keydown", handleUserKeyDown);
      window.removeEventListener("keyup", handleUserKeyUp);
    };
  });

  return (
    <Grid
    item
    xs="1"
    sm="1"
    md="1"
    lg="1"
    xl="1"
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
      <div className={isPlaying ? "key active" : "key"}>
        <div className="key-label">{props.label}</div>
        <div className="sound-label">Sound 1</div>
      </div>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Key);

import React from "react";

import AdjustIcon from "@material-ui/icons/Adjust";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";

const PlayAndRecordButton = (props) => {
  return (
    <div>
      <div className="soundBtn">
        <AdjustIcon
          color={props.isRecording ? "secondary" : ""}
          onClick={props.onClickRecording}
        />
      </div>
      <div className="soundBtn">
        {props.isPlaying ? (
          <StopIcon onClick={props.onClickPlaying} />
        ) : (
          <PlayCircleFilledIcon onClick={props.onClickPlaying} />
        )}
      </div>
    </div>
  );
};

export default PlayAndRecordButton;

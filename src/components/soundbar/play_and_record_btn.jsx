import { useState } from "react";
import AdjustIcon from "@material-ui/icons/Adjust";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";

const PlayAndRecordButton = (props) => {
  const [isHoveringRecord, setHoveringRecord] = useState(false);
  const [isHoveringPlay, setHoveringPlay] = useState(false);

  return (
    <div>
      <div className="soundBtn">
        <AdjustIcon
          className={isHoveringRecord ? "hover" : ""}
          color={props.isRecording ? "secondary" : ""}
          onClick={props.onClickRecording}
          onMouseEnter={() => {
            setHoveringRecord(true);
          }}
          onMouseLeave={() => {
            setHoveringRecord(false);
          }}
        />
      </div>
      <div className="soundBtn">
        {props.isPlaying ? (
          <StopIcon
            className={isHoveringPlay ? "hover" : ""}
            onClick={props.onClickPlaying}
            onMouseEnter={() => {
              setHoveringPlay(true);
            }}
            onMouseLeave={() => {
              setHoveringPlay(false);
            }}
          />
        ) : (
          <PlayCircleFilledIcon
            className={isHoveringPlay ? "hover" : ""}
            onClick={props.onClickPlaying}
            onMouseEnter={() => {
              setHoveringPlay(true);
            }}
            onMouseLeave={() => {
              setHoveringPlay(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PlayAndRecordButton;

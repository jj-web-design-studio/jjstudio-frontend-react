import { useState } from 'react';
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";

const PlayButton = (props) => {
  const [isHovering, setHovering] = useState(false);

  return (
    <div className="soundBtn">
      {props.isPlaying ? (
        <StopIcon
          className={isHovering ? "hover" : ""}
          onClick={props.onClick}
          onMouseEnter={() => {
            setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
          }}
        />
      ) : (
        <PlayCircleFilledIcon
          className={isHovering ? "hover" : ""}
          onClick={props.onClick}
          onMouseEnter={() => {
            setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
          }}
        />
      )}
    </div>
  );
};

export default PlayButton;
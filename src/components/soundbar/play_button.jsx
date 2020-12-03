import { useState } from 'react';
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import StopIcon from "@material-ui/icons/Stop";

const PlayButton = (props) => {
  const [isHoveringPlay, setHoveringPlay] = useState(false);

  return (
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
  );
};

export default PlayButton;
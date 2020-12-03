import { useState } from "react";
import AdjustIcon from "@material-ui/icons/Adjust";

const RecordButton = (props) => {
  const [isHovering, setHovering] = useState(false);

  return (
    <div className="soundBtn">
      <AdjustIcon
        className={isHovering ? "hover" : ""}
        color={props.isRecording ? "secondary" : ""}
        onClick={props.onClick}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      />
    </div>
  );
};

export default RecordButton;

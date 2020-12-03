import { useState } from "react";
import AdjustIcon from "@material-ui/icons/Adjust";

const RecordButton = (props) => {
  const [isHoveringRecord, setHoveringRecord] = useState(false);

  return (
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
  );
};

export default RecordButton;

import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const RowIncrementer = (props) => {
  const [rows, setRows] = useState(1);
  const [isHoveringMinus, setHoveringMinus] = useState(false);
  const [isHoveringPlus, setHoveringPlus] = useState(false);

  const useStyles = makeStyles({
    removeCircleStyle: {
      opacity: rows <= 1 ? 0.5 : 1,
    },
  });
  const classes = useStyles();

  return (
    <div className="soundBtn">
      <div className={isHoveringMinus ? "soundBtn hover" : "soundBtn"}>
        <RemoveCircleIcon
          className={classes.removeCircleStyle}
          onClick={() => {
            rows > 1 ? setRows(rows - 1) : setRows(1);
            rows > 1 ? props.setRows(rows - 1) : props.setRows(1);
          }}
          onMouseEnter={() => {setHoveringMinus(true)}}
          onMouseLeave={() => {setHoveringMinus(false)}}
        />
      </div>
      <div className="soundBtn">Rows: {rows}</div>
      <div className={isHoveringPlus ? "soundBtn hover" : "soundBtn"}>
        <AddCircleIcon
          onClick={() => {
            setRows(rows + 1);
            props.setRows(rows + 1);
          }}
          onMouseEnter={() => {setHoveringPlus(true)}}
          onMouseLeave={() => {setHoveringPlus(false)}}
        />
      </div>
    </div>
  );
};

export default RowIncrementer;

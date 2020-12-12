import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const RowIncrementer = (props) => {
  const [rows, setRows] = useState(1);

  const useStyles = makeStyles({
    removeCircleStyle: {
      opacity: rows <= 1 ? 0.5 : 1,
    },
  });
  const classes = useStyles();

  return (
    <div className="soundBtn">
      <div className="soundBtn">
        <RemoveCircleIcon
          className={classes.removeCircleStyle}
          onClick={() => {
            rows > 1 ? setRows(rows - 1) : setRows(1);
            rows > 1 ? props.setRows(rows - 1) : props.setRows(1);
          }}
        />
      </div>
      <div className="soundBtn">Rows: {rows}</div>
      <div className="soundBtn">
        <AddCircleIcon
          onClick={() => {
            setRows(rows + 1);
            props.setRows(rows + 1);
          }}
        />
      </div>
    </div>
  );
};

export default RowIncrementer;

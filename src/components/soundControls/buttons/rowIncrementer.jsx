import { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { incrementRowCount, decrementRowCount } from "../../track/trackActions";

const RowIncrementer = (props) => {
  const { rowCount, incrementRowCount, decrementRowCount } = props;

  const [isHoveringMinus, setHoveringMinus] = useState(false);
  const [isHoveringPlus, setHoveringPlus] = useState(false);

  const useStyles = makeStyles({
    removeCircleStyle: {
      opacity: rowCount <= 1 ? 0.5 : 1,
    },
  });
  const classes = useStyles();

  return (
    <div className="soundBtn">
      <div className={isHoveringMinus ? "soundBtn hover" : "soundBtn"}>
        <RemoveCircleIcon
          className={classes.removeCircleStyle}
          onClick={() => {
            if (rowCount > 1) decrementRowCount(rowCount);
          }}
          onMouseEnter={() => {
            setHoveringMinus(true);
          }}
          onMouseLeave={() => {
            setHoveringMinus(false);
          }}
        />
      </div>
      <div className="soundBtn">Rows: {rowCount}</div>
      <div className={isHoveringPlus ? "soundBtn hover" : "soundBtn"}>
        <AddCircleIcon
          onClick={() => {
            incrementRowCount(rowCount);
          }}
          onMouseEnter={() => {
            setHoveringPlus(true);
          }}
          onMouseLeave={() => {
            setHoveringPlus(false);
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rowCount: state.track.track.rowCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementRowCount: (rowCount) => {
      dispatch(incrementRowCount(rowCount));
    },
    decrementRowCount: (rowCount) => {
      dispatch(decrementRowCount(rowCount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RowIncrementer);

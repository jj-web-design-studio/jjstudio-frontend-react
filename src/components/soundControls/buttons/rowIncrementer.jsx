import { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { incrementRowCount, decrementRowCount } from "../../track/trackActions";
import { Grid } from "@material-ui/core";

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
    <Grid
      item
      container
      xs={4}
      sm={4}
      md={4}
      lg={4}
      xl={4}
      justify="center"
      alignItems="center"
      className="soundBtn"
    >
      <Grid
        item
        xs={2}
        sm={2}
        md={3}
        lg={3}
        xl={4}
        className={isHoveringMinus ? "soundBtn hover" : "soundBtn"}
      >
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
      </Grid>
      <Grid item xs={2} sm={2} md={3} lg={3} xl={4} className="soundBtn">
        <div>Rows: {rowCount}</div>
      </Grid>
      <Grid
        xs={2}
        sm={2}
        md={3}
        lg={3}
        xl={4}
        item
        className={isHoveringPlus ? "soundBtn hover" : "soundBtn"}
      >
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
      </Grid>
    </Grid>
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

import { useEffect } from "react";
import { connect } from "react-redux";
import {
  loadDefaultKeyboard,
  loadKeyboardNameList,
} from "../../actions/keyboardActions";
import KeyboardDropdown from "./keyboardDropdown";
import Key from "./key";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const Keyboard = (props) => {
  const { loadDefaultKeyboard, loadKeyboardNameList } = props;
  const { keyboardMapping, currentKeyboard } = props;

  useEffect(() => {
    if (currentKeyboard == null) {
      loadDefaultKeyboard();
    }
  }, [loadDefaultKeyboard, currentKeyboard]);

  const renderKeyboardRow = (row, rowIndex) => {
    return (
      <Grid
        container
        item
        direction="row"
        justify="center"
        alignItems="center"
        className="keyRow"
        xs={10}
        sm={10}
        md={9}
        lg={9}
        xl={9}
      >
        {row.map((key) => {
          return (
            <Key
              key={key.keyCode}
              keyCode={key.keyCode}
              keyRowIndex={rowIndex}
              label={key.keyLabel}
              soundLabel={key.soundLabel}
              audio={key.sound.audio}
            />
          );
        })}
      </Grid>
    );
  };

  return (
    <Grid container justify="center" alignItems="center">
      {keyboardMapping != null ? (
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          className="keyBoard"
        >
          {renderKeyboardRow(keyboardMapping.numRow, 0)}
          {renderKeyboardRow(keyboardMapping.qweRow, 1)}
          {renderKeyboardRow(keyboardMapping.asdRow, 2)}
          {renderKeyboardRow(keyboardMapping.zxcRow, 3)}
        </Grid>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    keyboardMapping: state.keyboard.mapping,
    currentKeyboard: state.keyboard.currentKeyboardId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDefaultKeyboard: () => dispatch(loadDefaultKeyboard()),
    loadKeyboardNameList: () => dispatch(loadKeyboardNameList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);

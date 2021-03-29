import { useEffect } from "react";
import { connect } from "react-redux";
import {
  loadKeyboardById,
  loadKeyboardNameList,
} from "../../actions/keyboardActions";
import KeyboardDropdown from "./keyboardDropdown";
import Key from "./key";
import { Grid } from "@material-ui/core";

const Keyboard = (props) => {
  const { loadKeyboardMapping, loadKeyboardNameList } = props;
  const { keyboardMapping, currentKeyboard } = props;

  useEffect(() => {
    loadKeyboardMapping(currentKeyboard)
  }, [loadKeyboardMapping, currentKeyboard]);

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
    <div>
      {keyboardMapping != null ? (
        <Grid
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
        <>No keyboards found!</>
      )}
    </div>
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
    loadKeyboardMapping: (id) => dispatch(loadKeyboardById(id)),
    loadKeyboardNameList: () => dispatch(loadKeyboardNameList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import KeyboardDropdown from "./keyboardDropdown";
import Key from "./key";
import { NUM_ROW, QWE_ROW, ASD_ROW, ZXC_ROW } from "./keys";
import { Grid } from "@material-ui/core";

const Keyboard = (props) => {
  const currentKeyboardId = useSelector(
    (state) => state.keyboard.currentKeyboardId
  );

  const { loadKeyboardMapping, loadKeyboardNameList, loadSoundsByIds } = props;
  const { mapping, isAuthenticated, sounds } = props;

  useEffect(() => {
    loadKeyboardMapping(currentKeyboardId)
      .then(() => {
        if (isAuthenticated) {
          loadSoundsByIds([
            "5fcadb14d62a7b2f68b3cb27",
            "5fcadf1dd62a7b2f68b3cb28",
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    currentKeyboardId,
    isAuthenticated,
    loadKeyboardMapping,
    loadSoundsByIds,
  ]);

  const renderKeyboardRow = (row) => {
    return (
      <Grid
        container
        item
        direction="row"
        justify="center"
        alignItems="center"
        className="keyRow"
        xs="10"
        sm="10"
        md="9"
        lg="9"
        xl="9"
      >
        {row.map((key) => {
          return (
            <Key key={key.keyCode} keyCode={key.keyCode} label={key.label} />
          );
        })}
      </Grid>
    );
  };

  return (
    <div>
      {mapping != null ? (
        <Grid
          container
          xs="12"
        sm="12"
        md="12"
        lg="12"
        xl="12"
          justify="center"
          alignItems="center"
          className="keyBoard"
        >
          <div className="keyRow">
            {isAuthenticated ? (
              <KeyboardDropdown
                current={mapping.name}
                loadKeyboardNameList={loadKeyboardNameList}
              />
            ) : (
              <></>
            )}
          </div>
          {renderKeyboardRow(NUM_ROW)}
          {renderKeyboardRow(QWE_ROW)}
          {renderKeyboardRow(ASD_ROW)}
          {renderKeyboardRow(ZXC_ROW)}
        </Grid>
      ) : (
        <>No keyboards found!</>
      )}
    </div>
  );
};

export default withRouter(Keyboard);

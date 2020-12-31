import { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import KeyboardDropdown from "./keyboardDropdown";
import Key from "./key";
import { NUM_ROW, QWE_ROW, ASD_ROW, ZXC_ROW } from "./keys";

const Keyboard = (props) => {

  const currentKeyboardId = useSelector(state => state.keyboard.currentKeyboardId);

  const { loadKeyboardMapping, loadKeyboardNameList, loadSoundsByIds } = props;
  const { mapping, isAuthenticated, sounds } = props;

  useEffect(() => {
    loadKeyboardMapping(currentKeyboardId).then(() => {
      if (isAuthenticated) {
        loadSoundsByIds(["5fcadb14d62a7b2f68b3cb27", "5fcadf1dd62a7b2f68b3cb28"])
      }
    }).catch((err) => {
      console.log(err);
    });
  }, [currentKeyboardId, isAuthenticated, loadKeyboardMapping, loadSoundsByIds]);

  return (
    <div>
      {mapping != null ? (
        <div className="keyBoard">
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
          <div className="numRow keyRow">
            {NUM_ROW.map((key) => {
             return <Key
                key={key.keyCode}
                keyCode={key.keyCode}
                label={key.label}
                soundId={
                  mapping.numRowM != null
                    ? mapping.numRow[key.keyCode.toString()]
                    : ""
                }
              />
              })}
          </div>
          <div className="qweRow keyRow">
            {QWE_ROW.map((key) => (
              <Key
                key={key.keyCode}
                keyCode={key.keyCode}
                label={key.label}
                soundId={
                  mapping.qweRow != null
                    ? mapping.qweRow[key.keyCode.toString()]
                    : ""
                }
              />
            ))}
          </div>
          <div className="asdRow keyRow">
            {ASD_ROW.map((key) => (
              <Key
                key={key.keyCode}
                keyCode={key.keyCode}
                label={key.label}
                soundId={
                  mapping.asdRow != null
                    ? mapping.asdRow[key.keyCode.toString()]
                    : ""
                }
              />
            ))}
          </div>
          <div className="zxcRow keyRow">
            {ZXC_ROW.map((key) => (
              <Key
                key={key.keyCode}
                keyCode={key.keyCode}
                label={key.label}
                soundId={
                  mapping.zxcRow != null
                    ? mapping.zxcRow[key.keyCode.toString()]
                    : ""
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default withRouter(Keyboard);

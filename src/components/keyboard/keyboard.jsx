import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import KeyboardDropdown from "./keyboard_dropdown";
import Key from './key';
import { NUM_ROW, QWE_ROW, ASD_ROW, ZXC_ROW } from "./keys";
import './keyboard.css';

const Keyboard = (props) => {
  const isAuthenticated  = useSelector(state => state.session.isAuthenticated);

  const { loadDefaultKeyboard, loadKeyboardNameList, keyboardName, numRowMapping, qweRowMapping, asdRowMapping, zxcRowMapping } = props;

  useEffect(() => {
    
    loadDefaultKeyboard();

  }, [loadDefaultKeyboard]);

  return (
    <div className="keyBoard">
      <div className="keyRow">
        { isAuthenticated ? <KeyboardDropdown current={keyboardName} loadKeyboardNameList={loadKeyboardNameList} /> : <></>}
      </div>
      <div className="numRow keyRow">
        {NUM_ROW.map((key) => (
          <Key key={key.keyCode} keyCode={key.keyCode} label={key.label} soundId={numRowMapping != null ? numRowMapping[key.keyCode] : ""} />
        ))}
      </div>
      <div className="qweRow keyRow">
        {QWE_ROW.map((key) => (
          <Key key={key.keyCode} keyCode={key.keyCode} label={key.label} soundId={qweRowMapping != null ? qweRowMapping[key.keyCode] : ""} />
        ))}
      </div>
      <div className="asdRow keyRow">
        {ASD_ROW.map((key) => (
          <Key key={key.keyCode} keyCode={key.keyCode} label={key.label} soundId={asdRowMapping != null ? asdRowMapping[key.keyCode] : ""} />
        ))}
      </div>
      <div className="zxcRow keyRow">
        {ZXC_ROW.map((key) => (
          <Key key={key.keyCode} keyCode={key.keyCode} label={key.label} soundId={zxcRowMapping != null ? zxcRowMapping[key.keyCode] : ""} />
        ))}
      </div>
    </div>
  )
}

export default withRouter(Keyboard);
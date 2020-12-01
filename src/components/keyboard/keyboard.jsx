import React, { useEffect } from 'react';
import { withRouter } from "react-router-dom";
import KeyboardDropdown from "./keyboard_dropdown";
import Key from './key';
import { NUM_ROW, QWE_ROW, ASD_ROW, ZXC_ROW } from "./keys";
import './keyboard.css';

const Keyboard = (props) => {
  const { loadDefaultKeyboard, keyboardName, numRowMapping, qweRowMapping, asdRowMapping, zxcRowMapping } = props;

  useEffect(() => {
    
    loadDefaultKeyboard();

  }, [loadDefaultKeyboard]);

  return (
    <div>
      <div className="keyRow">
        <KeyboardDropdown current={keyboardName} />
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
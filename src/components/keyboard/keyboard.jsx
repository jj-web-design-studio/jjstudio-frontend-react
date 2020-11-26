import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";

import Key from './key';
import './keyboard.css';

const numRow = "1234567890-=";

const qweRow = "QWERTYUIOP[]";

const asdRow = "ASDFGHJKL;'";

const zxcRow = "ZXCVBNM,./";

const Keyboard = (props) => {
  const { keyboardMapping } = useState(0);
  const { loadDefaultKeyboard } = props;

  useEffect(() => {

    loadDefaultKeyboard();

  }, [loadDefaultKeyboard]);

  return (
    <div>
      <div className="numRow keyRow">
        {numRow.split("").map(name => (
          <Key key={name} label={name} />
        ))}
      </div>
      <div className="qweRow keyRow">
        {qweRow.split("").map(name => (
          <Key key={name} label={name} />
        ))}
      </div>
      <div className="asdRow keyRow">
        {asdRow.split("").map(name => (
          <Key key={name} label={name} />
        ))}
      </div>
      <div className="zxcRow keyRow">
        {zxcRow.split("").map(name => (
          <Key key={name} label={name} />
        ))}
      </div>
    </div>
  )
}

export default withRouter(Keyboard);
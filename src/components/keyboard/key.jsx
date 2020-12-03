import React, { useCallback, useEffect, useState } from "react";

const Key = (props) => {
  const [isPlaying, setPlaying] = useState(false);

  const handleUserKeyDown = useCallback(
    (e) => {
      const { keyCode } = e;
      if (keyCode == props.keyCode) {
        setPlaying(true);
        // Play sound
      }
    },
    [props]
  );

  const handleUserKeyUp = useCallback(
    (e) => {
      const { keyCode } = e;
      if (keyCode == props.keyCode) {
        setPlaying(false);
      }
    },
    [props]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyDown);
    window.addEventListener("keyup", handleUserKeyUp);

    return () => {
      window.removeEventListener("keydown", handleUserKeyDown);
      window.removeEventListener("keyup", handleUserKeyUp);
    };
  });

  const onMouseDown = (e) => {
    e.preventDefault();
    setPlaying(true);
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    setPlaying(false);
  };

  return (
    <div
      className={isPlaying ? "key active" : "key"}
      color="secondary"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {props.label}
    </div>
  );
};

export default Key;

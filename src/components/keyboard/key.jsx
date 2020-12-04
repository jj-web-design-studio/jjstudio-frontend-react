import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Key = (props) => {
  const modal = useSelector((state) => state.ui.modal);
  const [isPlaying, setPlaying] = useState(false);

  const handleUserKeyDown = useCallback(
    (e) => {
      if (modal === null) {
        e.preventDefault();
        const { keyCode } = e;
        if (keyCode == props.keyCode) {
          setPlaying(true);
          // Play sound
        }
      }
    },
    [modal, props]
  );

  const handleUserKeyUp = useCallback(
    (e) => {
      if (modal === null) {
        e.preventDefault();
        const { keyCode } = e;
        if (keyCode == props.keyCode) {
          setPlaying(false);
        }
      }
    },
    [modal, props]
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
      <div className="key-label">
        {props.label}
      </div>
      {props.soundId}
    </div>
  );
};

export default Key;

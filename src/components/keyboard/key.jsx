import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const isLeftMouseClick = (e) => {
  return e.button === 0;
}

const Key = (props) => {
  const modal = useSelector((state) => state.ui.modal);
  const [isPlaying, setPlaying] = useState(false);

  const handleUserKeyDown = useCallback(
    (e) => {
      if (modal) return;

      if (e.keyCode == props.keyCode) {
        setPlaying(true);
      }
    },
    [modal, props]
  );

  const handleUserKeyUp = useCallback(
    (e) => {
      if (modal) return;

      if (e.keyCode == props.keyCode) {
        setPlaying(false);
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

  return (
    <div
      className={isPlaying ? "key active" : "key"}
      color="secondary"
      onMouseDown={(e) => {setPlaying(isLeftMouseClick(e) ? true : false) }}
      onMouseUp={() => {setPlaying(false)}}
      onMouseLeave={() => {setPlaying(false)}}
    >
      <div className={isPlaying ? "key-label key-active" : "key-label"}>
        {props.label}
      </div>
      {props.soundId}
    </div>
  );
};

export default Key;

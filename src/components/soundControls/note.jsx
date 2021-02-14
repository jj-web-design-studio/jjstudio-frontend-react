import React, { useState, useEffect, useCallback, useRef } from "react";

const Note = (props) => {
  const [isDragging, setDragging] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const [isSelected, setSelected] = useState(false);
  const [left, setLeft] = useState(props.left);
  const [originalLeft, setOriginalLeft] = useState(props.left);
  const ref = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 8 && isSelected) {
        props.deleteNote(props.noteIndex);
      }
    },
    [isSelected, props]
  );

  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setSelected(false);
    }
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.button !== 0) return;
    setDragging(true);
    // setLeft(((e.clientX - 10) / props.windowWidth) * 100);
  };

  const handleMouseUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
    if (left !== originalLeft) props.updateLeftInParent(props.noteIndex, left);
  };

  const handleMouseMove = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isDragging) return;
      setLeft(((e.clientX - 10) / props.windowWidth) * 100);
    },
    [isDragging, props.windowWidth]
  );

  const roundToNearestMultiple = (left) => {
    let rounded = Math.ceil(left / 0.78125) * 0.78125;
    return rounded;
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleKeyDown]);

  return (
      <div
        style={{
          height: 50,
          width: props.windowWidth / 128,
          left: roundToNearestMultiple(left) + "%",
          backgroundColor: props.color,
          position: "absolute",
          opacity: isDragging ? 0.5 : 1,
          cursor: isDragging ? "grabbing" : isHovering ? "grab" : "",
          border: isSelected ? "2px dotted black" : "",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => setSelected(true)}
        ref={ref}
      >
        {isHovering ? (
        <div
        className="note-label"
          
        >
          {(props.label).toUpperCase()}
        </div>
      ) : (
        <div
        className="note-label"
          
        >
          {(props.label).toUpperCase()}
        </div>
      )}
      </div>
  );
};

export default Note;

import React, { useState, useEffect, useCallback } from "react";

const Note = (props) => {
  const [isDragging, setDragging] = useState(false);
  const [isHovering, setHovering] = useState(false);
  const [left, setLeft] = useState(props.left);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.button !== 0) return;
    setDragging(true);
    setLeft(((e.clientX - 10) / props.windowWidth) * 100);
  };

  const handleMouseUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
    props.updateLeftInParent(props.noteIndex, left);
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

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div
      style={{
        height: 50,
        width: props.windowWidth / 128,
        left: roundToNearestMultiple(left) + "%",
        backgroundColor: "blue",
        position: "absolute",
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : isHovering ? "grab" : "" 
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {setHovering(true)}}
      onMouseLeave={() => {setHovering(false)}}
    />
  );
};

export default Note;

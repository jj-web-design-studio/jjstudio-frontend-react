import React, { useState, useRef } from "react";

const Note = (props) => {
  const [ isDragging, setDragging ] = useState(false);
  const [ left, setLeft ] = useState(props.left);

  const noteReference = useRef();

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setDragging(true);
    setLeft(e.pageX / props.windowWidth * 100);
 
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setLeft(e.pageX / props.windowWidth * 100);
  
    e.stopPropagation();
    e.preventDefault();
  };

  const roundToNearestMultiple = (left) => {
    let rounded = (Math.ceil(left/0.78125) * 0.78125) 
    return rounded
  }

  return (
    <div
      ref={noteReference}
      style={{
        width: props.windowWidth/128,
        height: 40,
        left: roundToNearestMultiple(left) + "%",
        backgroundColor: "blue",
        position: "absolute",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
};

export default Note;

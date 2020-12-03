import React from "react";

const Note = (props) => {
  return (
    <div
      style={{
        width: 10,
        height: 40,
        left: props.left,
        backgroundColor: "blue",
        position: "absolute",
      }}
    />
  );
};

export default Note;
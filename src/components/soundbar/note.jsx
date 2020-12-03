const Note = (props) => {

  const handleOnDrag = (e) => {
    
  }

  const handleOnDragEnd = (e) => {

  }

  return (
    <div
      style={{
        width: 10,
        height: 40,
        left: props.left,
        backgroundColor: "blue",
        position: "absolute",
      }}
      onDrag={handleOnDrag}
      onDragEnd={handleOnDragEnd}
    />
  );
};

export default Note;

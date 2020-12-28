import { useState } from "react";

const ListItem = (props) => {
  const [isHovering, setHovering] = useState(false);
  const {index, selected, setSelected} = props;

  const handleMouseEnter = (e) => {
    setHovering(true);
  };

  const handleMouseLeave = (e) => {
    setHovering(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setSelected(index);
  }

  return (
    <li
      className={isHovering ? "modal-list-item-hover" : selected ? "modal-list-item-selected" : "modal-list-item"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {props.label}
    </li>
  );
};

export default ListItem;

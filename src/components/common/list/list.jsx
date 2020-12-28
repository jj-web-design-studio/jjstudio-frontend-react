import { useState } from "react";
import ListItem from "./listItem";

const List = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const {items, setSelectedItem} = props;

  return (
    <ol className="modal-list">
      {items.map(({label}, i) => (
        <ListItem key={i} index={i} selected={selectedIndex === i} label={label} setSelected={(i) => {setSelectedIndex(i); setSelectedItem(items[i].id)}} />
      ))}
    </ol>
  );
};

export default List;

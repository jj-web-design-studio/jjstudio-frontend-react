import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const KeyboardDropdown = (props) => {
  const { loadKeyboardNameList } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const keyboardNameList = useSelector(state => state.keyboard.nameList)

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    loadKeyboardNameList();
  }, [loadKeyboardNameList]);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{props.current}</DropdownToggle>
      <DropdownMenu>
        {keyboardNameList != null ? keyboardNameList.map(name => {
          return <DropdownItem>{name}</DropdownItem>
        }) : ""}
      </DropdownMenu>
    </Dropdown>
  );
};

export default KeyboardDropdown;

import { DropdownItem } from "reactstrap";

const OptionItem = (props) => {
  return <DropdownItem onClick={props.onClick}>{props.label}</DropdownItem>;
};

export default OptionItem;
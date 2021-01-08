import { useState } from "react";
import { connect } from "react-redux";
import OptionItem from "./optionItem";
import { openModal } from "../common/modal/modalActions";
import { logout } from "../session/sessionActions";
import { clearTrack } from "../track/trackActions";
import TrackTitle from "./trackTitle";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import GitHubIcon from "@material-ui/icons/GitHub";
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { LOGIN, LOAD_TRACK } from "../common/modal/modal";

const AppNavBar = (props) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  const logButton = !props.isAuthenticated ? (
    <NavLink className="logbutton" onClick={() => props.openModal(LOGIN)}>
      {" "}
      <AccountCircleIcon />
    </NavLink>
  ) : (
    <NavLink className="logbutton" onClick={props.logout}>
      {" "}
      <ExitToAppIcon />
    </NavLink>
  );

  return (
    <div>
      <Navbar className="nav" color="light" light expand="sm">
        <NavbarBrand href="/">J J | S T U D I O </NavbarBrand>
        <NavbarText className="track-title-wrapper">
          <TrackTitle />
        </NavbarText>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/jj-web-design-studio">
                <GitHubIcon />
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <SettingsIcon />
              </DropdownToggle>
              <DropdownMenu right>
                <OptionItem label="New Track" onClick={props.clearTrack} />
                <OptionItem
                  label="Load Track"
                  onClick={() => {
                    props.openModal(props.isAuthenticated ? LOAD_TRACK : LOGIN);
                  }}
                />
                <DropdownItem divider />
                <DropdownItem>Manage Sounds</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Manage Keyboards</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              {/* <NavLink onClick={() => this.props.openModal('login')}>Log In</NavLink> */}
              {logButton}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    logout: () => dispatch(logout()),
    clearTrack: () => dispatch(clearTrack()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);

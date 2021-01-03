import { useState } from "react";
import { connect } from "react-redux";
import { openModal } from "../common/modal/modalActions";
import { logout } from "../session/sessionActions";
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
import { LOGIN } from "../common/modal/modal";

const AppNavBar = (props) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  const logButton = !props.session ? (
    <NavLink className="logbutton" onClick={() => props.openModal(LOGIN)}>
      {" "}
      Log In
    </NavLink>
  ) : (
    <NavLink className="logbutton" onClick={props.logout}>
      {" "}
      Log Out
    </NavLink>
  );

  return (
    <div>
      <Navbar className="nav" color="light" light expand="sm">
        <NavbarBrand href="/">J J | S T U D I O </NavbarBrand>
        <NavbarText>
          <TrackTitle />
        </NavbarText>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/jj-web-design-studio">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>New Track</DropdownItem>
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
    session: state.session.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (modal) => dispatch(openModal(modal)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);

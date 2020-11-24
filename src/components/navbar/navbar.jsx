import React from 'react';
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
    DropdownItem
} from 'reactstrap';
import './navbar.css'

class AppNavbar extends React.Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {

        const logButton = (!this.props.session) ? (
            < NavLink className="logbutton" onClick = {() => this.props.openModal('login')}> Log In</NavLink >
        ) : (
            < NavLink onClick={this.props.logout}> Log Out</NavLink >
        )
        return (
            <div>
                <Navbar color="dark" dark expand="sm">
                    <NavbarBrand href="/">JJ Studio</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/justinchung/jcstudio">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Settings
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
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
    }
}

export default AppNavbar;
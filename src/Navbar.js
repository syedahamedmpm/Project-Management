import React from "react";
import { Link } from "react-router-dom";
import{Navbar,NavbarBrand,NavbarToggler,NavItem,NavLink,Collapse,Nav,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem} from 'reactstrap'
class Navbars extends React.Component{
    render(){
        return(
            <div className="mb-5">
  <Navbar
    color="light"
    expand="md"
    fixed="top"
    light
  >
    <NavbarBrand>
    <Link to='/'>Project Management</Link>
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>
          <NavLink>
            <Link to='/'>Logout</Link>
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
</div>
        )
    }
}
export default Navbars;
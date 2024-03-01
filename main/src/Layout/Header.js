/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';


const Header = () => {

  // const [showSidebar, setShowSidebar] = useState(true);

  // const toggleSidebar = () => {
  //     document.getElementById('wrapper').classList.toggle('toggled');
  //   setShowSidebar(!showSidebar);
  // };


  const NavBar = () => {
    return (
      <Navbar expand="lg" className="p-3 bg-new">
        {/* <span id="menu-toggle" onClick={toggleSidebar}><i class="bi bi-list me-3" style={{fontSize: "30px",cursor:"pointer"}}></i></span> */}
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success"><i class="bi bi-search"></i></Button>
          </Form>
        </Navbar.Collapse>
        <div className="d-flex">
          <img src="assets\img\profile-pic.png" alt="User Profile" className="avatar ms-4" style={{width: "44px"}}/>
          <span className="ms-2 mt-2">John Doe</span>
        </div>
      </Navbar>
    );
  };

  return (
    <div>
      <NavBar />
    </div>
  );
};

export default Header;

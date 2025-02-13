import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomDropdown = () => {
    return (
        <Navbar variant="light" bg="transparent" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Dropdown"
                  menuVariant="light"
                >
                  <NavDropdown.Item href="#action/3.1">Not Started</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Blocked</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">In progress</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">Completed</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  );
}

export default CustomDropdown;
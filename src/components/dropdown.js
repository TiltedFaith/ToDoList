import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomDropdown = ({setSelectedStatus, onChange}) => {
    let notStarted = "Not Started";
    let blocked = "Blocked";
    let inProgress = "In Progress";
    let completed = "Completed";

    return (
        <Navbar variant="light" bg="transparent" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={setSelectedStatus}
                  menuVariant="light"
                >     
                    <NavDropdown.Item onClick={() => onChange(notStarted)}>{notStarted}</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => onChange(blocked)}>{blocked}</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => onChange(inProgress)}>{inProgress}</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => onChange(completed)}>{completed}</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  );
}

export default CustomDropdown;
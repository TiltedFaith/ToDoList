import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomDropdown = ({id, initialStatus, onChange}) => {
    const [selectedOption, setSelectedOption] = useState(initialStatus  || "Not Started");

    useEffect(() => {
      // Load individual status from localStorage
      const savedStatus = localStorage.getItem(`status_${id}`);
        if (savedStatus) {
          setSelectedOption(savedStatus);
        }
      }, [id]);

      const handleSelect = (status) => {
        setSelectedOption(status);
        localStorage.setItem(`status_${id}`, status); // Save status with unique key
        onChange(status);
      };

    return (
        <Navbar variant="light" bg="transparent" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={selectedOption}
                  menuVariant="light"
                >     
                    <NavDropdown.Item onClick={() => {onChange("Not Started"); handleSelect("Not Started")}}>Not Started</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => {onChange("Blocked"); handleSelect("Blocked")}}>Blocked</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => {onChange("In Progress"); handleSelect("In Progress")}}>In Progress</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => {onChange("Completed"); handleSelect("Completed")}}>Completed</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  );
}

export default CustomDropdown;
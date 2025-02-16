import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/dropdown.css";


const CustomDropdown = ({ id, initialStatus, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(initialStatus || "Not Started");

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
    <div className="custom-dropdown">
      <NavDropdown
        id={`dropdown-${id}`}
        title={selectedOption}
        menuVariant="light"
        className="transparent-dropdown"
      >
        <NavDropdown.Item className="status-not-started" onClick={() => handleSelect("Not Started")}>
          Not Started
        </NavDropdown.Item>
        <NavDropdown.Item className="status-blocked" onClick={() => handleSelect("Blocked")}>
          Blocked
        </NavDropdown.Item>
        <NavDropdown.Item className="status-in-progress" onClick={() => handleSelect("In Progress")}>
          In Progress
        </NavDropdown.Item>
        <NavDropdown.Item className="status-completed" onClick={() => handleSelect("Completed")}>
          Completed
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default CustomDropdown;

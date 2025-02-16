import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/dropdown.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CustomDropdown = ({ id, initialStatus, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(initialStatus || "Not Started");

  useEffect(() => {
    
    const savedStatus = localStorage.getItem(`status_${id}`);
    if (savedStatus) {
      setSelectedOption(savedStatus);
    }
  }, [id]);

  const handleSelect = (status) => {
    setSelectedOption(status);
    localStorage.setItem(`status_${id}`, status); 
    onChange(status);
  };

  const statusIcons = {
    "Not Started": "bi-hourglass",
    "Blocked": "bi-slash-circle",
    "In Progress": "bi-arrow-repeat",
    "Completed": "bi-check-circle"
  };

  return (
    <div className="custom-dropdown">
      <NavDropdown
        id={`dropdown-${id}`}
        title={
          <>
            <i className={`bi ${statusIcons[selectedOption]} me-2`}></i>
            {selectedOption}
          </>
        }
        menuVariant="light"
        className="transparent-dropdown"
      >
        <NavDropdown.Item onClick={() => handleSelect("Not Started")}>
          <i className="bi bi-hourglass me-2"></i> Not Started
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleSelect("Blocked")}>
          <i className="bi bi-slash-circle me-2"></i> Blocked
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleSelect("In Progress")}>
          <i className="bi bi-arrow-repeat me-2"></i> In Progress
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleSelect("Completed")}>
          <i className="bi bi-check-circle me-2"></i> Completed
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default CustomDropdown;
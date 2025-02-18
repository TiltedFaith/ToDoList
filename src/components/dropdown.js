import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/dropdown.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CustomDropdown = ({ id, initialStatus, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(initialStatus || "Not Started");

  // Sync with external updates (like "Complete All Tasks")
  useEffect(() => {
    setSelectedOption(initialStatus); 
  }, [initialStatus]);  // Re-run effect when `initialStatus` changes

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
        {Object.keys(statusIcons).map((status) => (
          <NavDropdown.Item key={status} onClick={() => handleSelect(status)}>
            <i className={`bi ${statusIcons[status]} me-2`}></i> {status}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </div>
  );
};

export default CustomDropdown;

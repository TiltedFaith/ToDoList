import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles/dropdown.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import PopUpModal from "./PopUpModal.js";

const CustomDropdown = ({ id, initialStatus, onChange, editable }) => {
  const [selectedOption, setSelectedOption] = useState(initialStatus || "Not Started");
  const [showStatusErrorModal, setShowStatusErrorModal] = useState(false);

  
  useEffect(() => {
    setSelectedOption(initialStatus); 
  }, [initialStatus]);

  const handleSelect = (status) => {
    
    if (editable && status === "Completed") {
      console.log("Not allowed, changing to Not Started");
      setShowStatusErrorModal(true);
      setSelectedOption("Not Started"); 
      onChange("Not Started"); 
      return;
    }

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
      <PopUpModal
        show={showStatusErrorModal}
        onHide={() => setShowStatusErrorModal(false)}
        title="Invalid Status"
        message="Completed status is not allowed while editing"
      />
    </div>
    
  );
};


export default CustomDropdown;

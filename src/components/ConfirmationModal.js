import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/ConfirmationStyles.css";  

const ConfirmationModal = ({ 
  show, 
  onHide, 
  onConfirm, 
  title, 
  message, 
  modalSize = "lg", 
  titleClass = "default-modal-title", 
  bodyClass = "default-modal-body",   
  footerClass = "default-modal-footer", 
  buttonClass = "default-modal-btn"  
}) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      size={modalSize} 
      className="custom-modal" 
    >
      <Modal.Header className={titleClass}>
        <Modal.Title>{title || "Confirm Action"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={bodyClass}>
        <p>{message || "Are you sure you want to proceed?"}</p>
      </Modal.Body>
      <Modal.Footer className={footerClass}>
        <Button 
          variant="secondary" 
          onClick={onHide} 
          className={`${buttonClass} cancel-btn`} // Add custom cancel class
          >
          Cancel
        </Button>
        <Button 
          variant="danger" 
          onClick={onConfirm} 
          className={`${buttonClass} confirm-btn`} // Add custom confirm class
          >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;

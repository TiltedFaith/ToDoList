import React from "react";
import { Modal, Button } from "react-bootstrap";

const PopUpModal = ({ show, onHide, title, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
        <Modal.Title>{title || "Confirm Action"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>{message || "Are you sure you want to proceed?"}</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
            Confirm
        </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default PopUpModal;

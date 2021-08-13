import { Modal, Button } from "react-bootstrap";
import React from 'react'
import Profile from './Profile'

export default function Popup(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
          <h4>{props.data.title}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Profile img={props.data.image} message={props.data.message}/>  
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
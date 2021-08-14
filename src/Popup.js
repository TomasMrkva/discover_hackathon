import { Modal, Button } from "react-bootstrap";
import React from 'react'
import Profile from './Profile'

export default function Popup(props) {

  const {data, deletePost, ...rest} = props

  function deleteHandler() {
    props.deletePost(props.data)
    props.onHide()
  } 

    return (
      <Modal
        {...rest}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
          <h4>{props.data.title}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Profile img={data.image} message={data.message}/>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteHandler}>Delete</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
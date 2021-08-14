import { Modal, Button } from "react-bootstrap";
import NewPostForm from './Form'
import React, {useState} from 'react'

export default function AddPost(props) {

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    function submitHandler() {
        props.addPost(title,message,image)
        props.onHide()
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal"
      >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>New Post</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <NewPostForm title={title} setTitle={setTitle} message={message} setMessage={setMessage} image={image} setImage={setImage} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitHandler}>Submit</Button>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
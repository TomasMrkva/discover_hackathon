import { Modal, Button } from "react-bootstrap";
import NewPostForm from './Form'
import React, {useState, useRef} from 'react'

export default function AddPost(props) {

    const fileInput = useRef(null);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    const {addPost, ...rest} = props

    function checkURL(url) {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
    }

    function submitHandler() {
        if (fileInput.current != null) {
          if(fileInput.current.files[0] == null) {
            alert('You need to upload a picture with your post!')
            return
          } else {
            addPost(title, message, fileInput.current.files[0])
          }
        } else if (!checkURL(image)) {
          alert('You need to upload a valid URL with your post!')
          return
        } else {
          addPost(title, message, image)
        }
        props.onHide()
    }

    return (
      <Modal
        {...rest}
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
            <NewPostForm title={title} setTitle={setTitle} message={message} setMessage={setMessage} image={image} setImage={setImage} fileInput={fileInput} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={submitHandler}>Submit</Button>
          <Button variant="danger" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
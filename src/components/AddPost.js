import { Modal, Button } from "react-bootstrap";
import NewPostForm from './Form'
import React, {useState, useRef} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { addPost } from '../firebase_operations';


export default function AddPost(props) {

    const fileInput = useRef(null);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    const {setLoading, ...rest} = props
    const { currentUser } = useAuth()

    // function checkURL(url) {
    //   return(url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
    // }

    function submitHandler() {
        if (fileInput.current != null) {
          if(fileInput.current.files[0] == null) {
            alert('You need to upload a picture with your post!')
            return
          } else {
            addPost(message, fileInput.current.files[0], setLoading, currentUser)
          }
        } else {
          addPost(message, image, setLoading, currentUser)
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
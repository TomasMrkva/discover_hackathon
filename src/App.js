import './App.css';
import Popup from './Popup'
import AddPost from './AddPost';
import Image from './Image'
import firebase from './firebase'
import React, { useState, useEffect } from 'react'
import { Button, Form, Spinner } from "react-bootstrap"

export default function App() {

  const [modalShow, setModalShow] = useState(false);
  const [newPostShow, setNewPostShow] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const ref =  firebase.firestore().collection('posts')

  function getPosts() {
    setLoading(true)
    ref.onSnapshot( (querySnapshot) => {
      const items = []
      querySnapshot.forEach(doc => {
        items.push({...doc.data(), id: doc.id})
      });
      setPosts(items)
    })
    setLoading(false)
  }

  async function uploadImage(file) {
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)
    return await fileRef.getDownloadURL()
  }

  const isString = (val) => typeof val === 'string' || val instanceof String

  async function addPost(title, message, imgData) {
    setLoading(true)
    let image;
    isString(imgData) ? image = imgData : image = await uploadImage(imgData)

    ref.doc().set({
        title: title,
        message: message,
        image: image,
        store: !isString(imgData)
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    setLoading(false)
  }

  function deletePost(post) {
    setLoading(true)
    ref.doc(post.id).delete()
    .then(() => {
      console.log("Document successfully deleted!");
      post.store && deleteImage(post)
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
    setLoading(false)
  }

  function deleteImage(post) {
      var desertRef = firebase.storage().refFromURL(post.image)
      desertRef.delete()
      .then(() => {
        console.log('deleted image from storage successfully')
      })
      .catch( 
        () => console.log('error occured on the storage cloud')
      );
  }

  useEffect(() => getPosts(),[]) // eslint-disable-line react-hooks/exhaustive-deps

  function imageClick(post) {
    setModalShow(true)
    setPopupData(post)
  }

  function Collage() {
    return(
      <div className="search-container">
      { posts.map((post,i) => {
        return(
          containsValue(post) && <Image key={i} post={post} imageClick={imageClick} />
          )
        })}
      </div>
    )
  }
  
  function Loading() {
    return <div style={{textAlign:'center'}}><Spinner animation="border" variant="primary" /></div>
  } 
  
  function containsValue(post) {
    if (search !== '') {
      return Object.values(post).map(val => val.toString()).some( value => value.toLowerCase().trim().includes(search.toString().toLowerCase().trim()))
    } else {
      return true
    }
  }

  return (
    <div className="d-grid">
      <Form.Control style={{marginTop: 5, marginBottom: 5}} type="text" placeholder="Search here" size="lg" value={search} onChange={(event) => setSearch(event.target.value)}/>
      { loading ? <Loading/> : <Collage/> }
      { popupData && <Popup show={modalShow} onHide={() => setModalShow(false)} data={popupData} deletePost={deletePost}/>}
      { newPostShow && <AddPost show={newPostShow} onHide={() => setNewPostShow(false)} addPost={addPost}/>}
      <Button style={{marginTop: 5, marginBottom: 5}} size="lg" onClick={() => setNewPostShow(true)}> Add a post </Button>
    </div>
  );

}
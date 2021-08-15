import './App.css';
import Popup from './Popup'
import AddPost from './AddPost';
import firebase from './firebase'
import React, { useState, useEffect } from 'react'
import { Button, Form, Spinner } from "react-bootstrap"

export default function App() {

  const [modalShow, setModalShow] = useState(false);
  const [newPostShow, setNewPostShow] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);
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
    // setTimeout(function () {
    //   setLoading(false)
    // }, 100);
  }

  function addPost(title, message, image) {
    ref.doc().set({
        title: title,
        message:message,
        image: image
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  }

  function deletePost(post) {
    ref.doc(post.id).delete()
    .then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  useEffect(() => getPosts(),[]) // eslint-disable-line react-hooks/exhaustive-deps

  function imageClick(post) {
    setModalShow(true)
    setPopupData(post)
    console.log(process.env.REACT_APP_FIREBASE_KEY)
  }

  function Collage() {
    return(
      <div className="search-container">
      { posts.map((post,i) => {
        return(
          containsValue(post) && <img src={post.image} alt="" id='image' onClick={() => imageClick(post)} key = {i}/>
          )
        })}
      </div>
    )
  }
  
  function Loading() {
    return<div style={{textAlign:'center'}}><Spinner animation="border" variant="primary" /></div>
  } 
  
  function containsValue(post) {
    if (search !== '') {
      return Object.values(post).some( value => value.toLowerCase().trim().includes(search.toString().toLowerCase().trim()))
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
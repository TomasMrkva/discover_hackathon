import './App.css';
import React from 'react'
import Popup from './Popup'
import AddPost from './AddPost';
import { useState, useEffect } from 'react';
import firebase from './firebase'
import { Button, Form, Spinner } from "react-bootstrap"

function App() {

  const [modalShow, setModalShow] = React.useState(false);
  const [newPostShow, setNewPostShow] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  const ref =  firebase.firestore().collection('posts')
  let numRows = 3
  let rows = []

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

  useEffect(() => {
    getPosts()
  },[])

  function imageClick(post) {
    setModalShow(true)
    setModalData(post)
  }

  function containsValue(post) {
    if (search !== '') {
      return Object.values(post).some( value => value.toLowerCase().includes(search.toString().toLowerCase()))
    } else {
      return true
    }
  }

  let row = 0
  for(var i = 0; i<posts.length; i++){
    //Add a row
    if(rows.length <= row){
      rows.push([]);
    }

    //Add to a row
    rows[row].push(posts[i]);

    //Increment or Reset
    row = numRows-1 === row ? 0 : row+1
  }

  function Collage() {
    return(
      rows.map((row,i) => 
        <div key={i}>
          { row.map( (post,k) => 
            containsValue(post) && <img src={post.image} onClick={() => imageClick(post)} className='cover' key = {k}/>
          )}
        </div>
      )
    )
  }

  const Loading = () => <div style={{textAlign:'center'}}><Spinner animation="border" variant="primary" /></div>


  return (
    <div className="d-grid">
      <Form.Control style={{marginTop: 5, marginBottom: 5}} type="text" placeholder="Search here" size="lg" value={search} onChange={(event) => setSearch(event.target.value)}/>
      { modalData && <Popup show={modalShow} onHide={() => setModalShow(false)} data={modalData} deletePost={deletePost}/>}
      { newPostShow && <AddPost show={newPostShow} onHide={() => setNewPostShow(false)} addPost={addPost}/>}
      { loading ? <Loading/> : <Collage/> }
      <Button style={{marginTop: 5, marginBottom: 5}} size="lg" onClick={() => setNewPostShow(true)}> Add a post </Button>
    </div>
  );
}
 
export default App;
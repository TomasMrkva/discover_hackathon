import React, { useState, useEffect } from 'react'
import { Button, Form } from "react-bootstrap"
import Popup from '../Popup'
import Collage from '../Collage'
import AddPost from '../AddPost';
import Loading from '../Loading'
import { SignOut } from '../UserLogin'
import { useAuth } from '../../contexts/AuthContext'
import { getPosts, addPost, deletePost } from '../../firebase_operations';

export default function AuthorizedView() {

  const [modalShow, setModalShow] = useState(false);
  const [newPostShow, setNewPostShow] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true)

  const { currentUser } = useAuth()

  useEffect(() => {
      document.body.style.backgroundImage = ''
      getPosts(setLoading, setPosts)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
  return(
    <div className="d-grid">
        <h1 style={{textAlign:'center'}}>Hello {currentUser.displayName}!</h1>
        <SignOut/>
        <Form.Control style={{marginTop: 5, marginBottom: 5}} 
                      type="text" 
                      placeholder="Search here" 
                      size="lg" 
                      value={search} 
                      onChange={(event) => setSearch(event.target.value)}
                      autoFocus
        />
        { loading ? <Loading/> : <Collage search={search} posts={posts} setModalShow={setModalShow} setPopupData={setPopupData}/> }
        { popupData && 
          <Popup show={modalShow} 
                 onHide={() => setModalShow(false)} 
                 data={popupData} 
                 deletePost={deletePost} 
                 setLoading={setLoading}
          />
        }
        { newPostShow && 
          <AddPost show={newPostShow} 
                   onHide={() => setNewPostShow(false)} 
                   addPost={addPost} 
                   setLoading={setLoading}
          />
        }
        <Button style={{marginTop: 5, marginBottom: 5}} 
                size="lg"
                onClick={() => setNewPostShow(true)}
        > Add a post </Button>
    </div>
  )

}
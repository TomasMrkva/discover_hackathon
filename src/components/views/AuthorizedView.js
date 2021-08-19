import React, { useState, useEffect } from 'react'
import SearchAppBar from '../SearchAppBar'
import Popup from '../Popup'
import Collage from '../Collage'
import AddPost from '../AddPost';
import Loading from '../Loading'
import { getPosts, addPost, deletePost } from '../../firebase_operations';
import FabButton from '../FabButton'

export default function AuthorizedView() {
  const [modalShow, setModalShow] = useState(false);
  const [newPostShow, setNewPostShow] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      document.body.style.backgroundImage = ''
      getPosts(setLoading, setPosts)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
  return(
    <div className="d-grid">
        <SearchAppBar search={search} setSearch={setSearch}/>
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
        <FabButton clickHandler={() => setNewPostShow(true)}/>
    </div>
  )
}
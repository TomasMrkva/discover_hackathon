import React, { useState, useEffect } from 'react'
import SearchAppBar from '../SearchAppBar'
import ImageCard from '../imagecard/ImageCard'
import Collage from '../Collage'
import AddPost from '../AddPost';
import Loading from '../Loading'
import FabButton from '../FabButton'
import { getPosts } from '../../firebase_operations';


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
      return() => {
        setPosts([])
      }
    },[]) //eslint-disable-line react-hooks/exhaustive-deps
  
  return(
    <div className="d-grid">
        <SearchAppBar search={search} setSearch={setSearch}/>
        { loading ? <Loading/> : <Collage search={search} posts={posts} setModalShow={setModalShow} setPopupData={setPopupData}/> }
        { popupData && 
          <ImageCard
                 show={modalShow} 
                 onHide={() => setModalShow(false)} 
                 post={popupData} 
                 setLoading={setLoading}
          />
        }
        { newPostShow && 
          <AddPost show={newPostShow} 
                   onHide={() => setNewPostShow(false)} 
                   setLoading={setLoading}
          />
        }
        <FabButton clickHandler={() => setNewPostShow(true)}/>
    </div>
  )
}
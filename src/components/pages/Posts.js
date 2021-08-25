import React, { useState } from 'react'
import ImageCard from '../imagecard/ImageCard'
import Collage from '../Collage'
import AddPost from '../AddPost';
import Loading from '../Loading'
import FabButton from '../FabButton'

export default function Posts({posts, loading, setLoading, search, setSearch}) {
  const [modalShow, setModalShow] = useState(false);
  const [newPostShow, setNewPostShow] = useState(false);
  const [popupData, setPopupData] = useState(null);  
  return(
    <div className="d-grid">
        {/* <SearchAppBar search={search} setSearch={setSearch}/> */}
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
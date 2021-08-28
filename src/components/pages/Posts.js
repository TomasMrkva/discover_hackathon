import React, { useState } from 'react'
import ImageCard from '../imagecard/ImageCard'
import Gallery from '../Gallery'
import AddPost from '../AddPost';
import Loading from '../Loading'
import FabButton from '../FabButton'

export default function Posts({posts, setPosts, loading, setLoading, search, setSearch, currentView, setCurrentView}) {
  const [modalShow, setModalShow] = useState(false);
  const [newPostShow, setNewPostShow] = useState(false);
  const [popupData, setPopupData] = useState(null);

  return(
    <div className="d-grid">
        {/* <SearchAppBar search={search} setSearch={setSearch}/> */}
        { loading ? <Loading/> 
        : <Gallery 
            search={search} 
            posts={posts}
            setPosts={setPosts} 
            setModalShow={setModalShow} 
            setPopupData={setPopupData} 
            setCurrentView={setCurrentView}
          /> 
        }
        { popupData && 
          <ImageCard
            show={modalShow} 
            onHide={() => setModalShow(false)} 
            post={popupData} 
            setLoading={setLoading}
            currentView={currentView}
            setCurrentView={setCurrentView}
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
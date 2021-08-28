import React from 'react'
import Image from './Image'

export default function Gallery({posts, setPosts, search, setModalShow, setPopupData, setCurrentView}) {

    const imageClick = (post) => {
        setModalShow(true)
        setPopupData(post)
    }

    const commentClick = (post) => {
      setModalShow(true)
      setPopupData(post)
      setCurrentView('comments')
    }

    function containsValue(post) {
      // console.log(Object.values(post))
        if (search !== '') {
          return Object.values(post).map(val => val.toString()).some( value => value.toLowerCase().trim().includes(search.toString().toLowerCase().trim()))
        } else {
          return true
        }
    }

    return(
      <div className="search-container" style={{paddingBottom: '78px'}}>
        { 
          posts.map((post,i) => containsValue(post) && <Image key={i} setPosts={setPosts} post={post} posts={posts} imageClick={imageClick} commentClick={commentClick}/>)
        }
      </div>
    )
}
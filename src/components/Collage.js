import React from 'react'
import Image from './Image'

export default function Collage({posts, search, setModalShow, setPopupData}) {

    const imageClick = (post) => {
        setModalShow(true)
        setPopupData(post)
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
          posts.map((post,i) => containsValue(post) && <Image key={i} post={post} imageClick={imageClick} />)
        }
      </div>
    )
}
import React, {useState} from 'react'

export default function Image({post, imageClick,...rest}) {

    const[loaded, setLoaded] = useState(false)

    return(
        <img
            key = {rest.key}
            style={loaded ? {} : {display: 'none'}}
            src={post.image} 
            alt="" 
            id='image' 
            onClick={() => imageClick(post)}
            onLoad={() => setLoaded(true)} 
        />
    )
}
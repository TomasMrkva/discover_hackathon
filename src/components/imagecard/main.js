import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../../contexts/AuthContext'
import { Avatar } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import { addLike, deletePost } from '../../firebase_operations';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
    header: {
      padding: 10
    },
    likeDelete: {
        padding: '12px 6px 12px 6px'
    },
    comment: {
        padding: '12px 6px 12px 12px'
    }
}));

export function MainHeader({post, onHide}) {

    const classes = useStyles();

    return(
        <CardHeader className={classes.header}
            avatar={
                <Avatar aria-label="post">
                    <img alt="avatar" src={post.author.avatar} style={{width: '100%', height: '100%'}}/>
                </Avatar>
            }
            action={
                <IconButton aria-label="close" onClick={onHide}>
                    <CloseIcon style={{color: 'black'}}/>
                </IconButton>
            }
            title={post.author.name}
            subheader={post.dateTime}
        />)
}

// export function MainImage ({post}) {
//     return(
//         <img 
//             ref={el => { ref.current = el; setRefVisible(!!el); }}
//             style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}
//             src={post.image}
//             alt=""
//         />
//     )
// }

export function Message({post}) {
    return(
        <Typography color="textPrimary" component="p">
            {post.message}
        </Typography>
    )
}

export function MainFooter({post, setCurrentView, onHide, setLoading}) {
    
    const { currentUser } = useAuth()
    const [likes, setLikes] = useState([]);
    const classes = useStyles();
    
    useEffect(() => {
        setLikes(post.likes)
        return () => {
          setLikes([])
        }
      },[post]
    )

    function deleteHandler() {
        deletePost(post, setLoading)
        onHide()
    }

    return(
        <>
            <div style={{ backgroundColor: 'rgb(255 221 221)' }}>
                <CardActions disableSpacing>
                    <IconButton 
                        className={classes.likeDelete} 
                        aria-label="add to favorites" 
                        style={{color: 'tomato'}}
                        onClick={() => {addLike(currentUser, post, setLikes)}}
                    >
                        { likes.map(el => el.email).includes(currentUser.email) ? <FavoriteIcon /> : <FavoriteBorderIcon/> }
                    </IconButton>
                    <Typography
                        color="textPrimary" 
                        component="p" 
                        style={{fontWeight: "600"}}
                        onClick={() => setCurrentView('likes')}
                    >
                        {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                    </Typography>

                    <IconButton 
                        className={classes.comment}
                        aria-label="add to favorites" 
                        style={{color: 'black', marginLeft: '10px'}}
                        onClick={() => setCurrentView('comments')}
                    >
                        <CommentIcon/>
                    </IconButton>
                    <Typography 
                        color="textPrimary" 
                        component="p" 
                        style={{fontWeight: "600"}}  
                        onClick={() => setCurrentView('comments')}
                    >
                        Comments
                    </Typography>
                    {currentUser.email === post.author.email &&
                    <IconButton 
                        className={classes.likeDelete} 
                        aria-label="delete" 
                        onClick={deleteHandler} 
                        style={{color: 'black', marginLeft: 'auto'}}
                    >
                        <DeleteIcon />
                    </IconButton>
                    }
                </CardActions>
            </div>
        </>
    )
}
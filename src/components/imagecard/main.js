import React, { useEffect } from 'react';
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
import { getCommentsByPostId } from '../../firebase_operations';


const useStyles = makeStyles((theme) => ({
    header: {
      padding: 10
    },
    likeDelete: {
        padding: '12px 6px 12px 6px'
    },
    comment: {
        padding: '12px 6px 12px 12px'
    },
    message: {
        cursor: 'pointer'
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
        <Typography color="textPrimary" variant='subtitle1' component="p">
            {post.message}
        </Typography>
    )
}

export function MainFooter({post, currentView, setCurrentView, onHide, setLoading, likes, setLikes, comments, setComments}) {
    
    const classes = useStyles();
    const { currentUser } = useAuth()
    
    useEffect(() => {
        setLikes(post.likes)
        const unsubscribe = getCommentsByPostId(post.id, setComments)
        return () => {
            unsubscribe()
            setLikes([])
            setComments([])

        }   
    },[post, setLikes, setComments])

    function deleteHandler() {
        deletePost(post, setLoading)
        onHide()
    }

    return(
        <>
            <div style={{ backgroundColor: 'rgb(255 221 221)', paddingLeft: '15px'}}>
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
                        className={classes.message}
                        component="p" 
                        style={{fontWeight: "600"}}
                        onClick={() => currentView !=='likes' && setCurrentView('likes')}
                    >
                        {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                    </Typography>

                    <IconButton 
                        className={classes.comment}
                        aria-label="add to favorites" 
                        style={{color: 'black', marginLeft: '10px'}}
                        onClick={() => currentView !=='comments' && setCurrentView('comments')}
                    >
                        <CommentIcon/>
                    </IconButton>
                    <Typography 
                        color="textPrimary" 
                        className={classes.message}
                        component="p" 
                        style={{fontWeight: "600"}}  
                        onClick={() => currentView !=='comments' && setCurrentView('comments')}
                    >
                        {comments?.length} {comments?.length === 1 ? 'Comment' : 'Comments'}
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
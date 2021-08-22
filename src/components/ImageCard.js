import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useAuth } from '../contexts/AuthContext'
import { Avatar } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import { deletePost, addLike } from '../firebase_operations';


const useStyles = makeStyles((theme) => ({
  header: {
    padding: 10
  }
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: 0,
  },
}))(MuiDialogContent);

const DialogContentText = withStyles((theme) => ({
  root: {
    paddingTop: '15px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingBottom: '15px',
    textAlign: 'justify'
  }
}))(MuiDialogContent);

export default function ImageCard({show, onHide, post, setLoading}) {

  const { currentUser } = useAuth()
  const classes = useStyles();
  const [likes, setLikes] = useState([]);

  function deleteHandler() {
    deletePost(post, setLoading)
    onHide()
  } 
  
  // eslint-disable-next-line
  useEffect(
    () => {
      setLikes(post.likes)
      return () => {
        setLikes([])
      }
    },[post])

  return(
    <Dialog PaperProps={ { style: { margin: 0 }} } open={show} onClose={onHide} maxWidth='md'>
      <CardHeader className={classes.header}
        avatar={
          <Avatar aria-label="post">
             <img alt="avatar" src={currentUser.providerData[0].photoURL} style={{width: '100%', height: '100%'}}/>
          </Avatar>
        }
        action={
          <IconButton aria-label="close" onClick={onHide}>
            <CloseIcon style={{color: 'black'}}/>
          </IconButton>
        }
        title={post.author}
        subheader={post.dateTime}
      />

      <DialogContent>
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain"
          }}
          src={post.image}
          alt=""
        />
      </DialogContent>

      <DialogContentText>
        <Typography  color="textPrimary" component="p">
          {post.message}
        </Typography>
      </DialogContentText>

      <div style={{backgroundColor: 'rgb(255 221 221)'}}>
        <CardActions disableSpacing  >

          <IconButton aria-label="add to favorites" 
                      style={{color: 'tomato'}}
                      onClick={() => {addLike(currentUser, post, setLikes)}}
          >
          { likes.includes(currentUser.email) ? <FavoriteIcon /> : <FavoriteBorderIcon/> }
          </IconButton>

          <Typography color="textPrimary" component="p" style={{fontWeight: "600",}}>{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</Typography>

          <IconButton aria-label="delete" onClick={deleteHandler} style={{color: 'black', marginLeft: 'auto'}}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </div>
     

    </Dialog>
  )

}
import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { MainHeader, Message, MainFooter } from './main'
import { LikesHeader, LikesContent } from './likes';
import { CommentsHeader, CommentsContent } from './comments';
import { makeStyles } from '@material-ui/core/styles';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: 0,
  },
}))(MuiDialogContent);

const useStyles = makeStyles(() => ({
  message: {
    padding: '0px 10px 5px 15px',
  }
}));

export default function ImageCard({show, onHide, post, setLoading, currentView, setCurrentView, setNewComments}) {

  const classes = useStyles();
  const ref = useRef(null)
  const [dimensions, setDimentions] = useState({})
  const [refVisible, setRefVisible] = useState(false)
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState()

  useEffect(() => {
      if (!refVisible) {
        return
      } 
      setDimentions({width: ref?.current.clientWidth, height: ref?.current.clientHeight})
      // console.log(ref.current.clientWidth, ref.current.clientHeight)
      // return () => {
      //   setDimentions({})
      // }
  },[refVisible])


  function hide() {
    onHide()
    setTimeout(function(){ setCurrentView('main') }, 225);
  }

  function onBack() {
    setCurrentView('main')
  }

  // const fullScreen = useMediaQuery(theme.breakpoints.down(''));


  return (
    <Dialog PaperProps={ { style: { margin: 0, maxHeight: '100%', height: '100%'} } } open={show}  onClose={onHide} maxWidth='md'>
      
      { currentView === 'comments' ? <CommentsHeader onHide={hide} onBack={onBack}/>
      : currentView === 'likes'    ? <LikesHeader onHide={hide} onBack={onBack}/>
      : <MainHeader post={post} onHide={hide}/>}
      
      <div className={classes.message}>
        { currentView === 'comments' ? null 
        : currentView === 'likes'    ? null 
        : <Message post={post} />
        }
      </div>
      <DialogContent id="content-page">
        { currentView === 'comments' ? <CommentsContent dimensions={dimensions} post={post} comments={comments} setComments={setComments} setNewComments={setNewComments}/>
        : currentView === 'likes' ? <LikesContent dimensions={dimensions} likes={likes}/>
        : <img
              onDoubleClick={() => window.open(post.image, "_blank")}
              ref={el => { ref.current = el; setRefVisible(!!el); }}
              style={{ maxWidth: "100%", objectFit: "cover", display: 'flex'}}
              src={post.image}
              alt=""
          />
        }
        {/* <div className={classes.message}>

      </div> */}
      </DialogContent>

      <MainFooter
        comments={comments}
        setComments={setComments}
        likes={likes}
        setLikes={setLikes}
        post={post}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onHide={hide}
        setLoading={setLoading}
      />
    </Dialog>
  )

}
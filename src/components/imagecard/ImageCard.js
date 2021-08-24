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

const DialogContentText = withStyles((theme) => ({
  root: {
    paddingTop: '15px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingBottom: '15px',
    textAlign: 'justify'
  }
}))(MuiDialogContent);

const useStyles = makeStyles(() => ({
  message: {
    overflowY: 'clip'
  }
}));

export default function ImageCard({show, onHide, post, setLoading}) {

  const classes = useStyles();
  const ref  = useRef(null)
  const [dimensions, setDimentions] = useState({})
  const [refVisible, setRefVisible] = useState(false)
  const [currentView, setCurrentView] = useState('main')
  const [likes, setLikes] = useState([])

  useEffect(() => {
      if (!refVisible) 
        return
      setDimentions({width: ref.current.clientWidth, height: ref.current.clientHeight})
  },[refVisible])


  function hide() {
    onHide()
    setTimeout(function(){ setCurrentView('main') }, 225);
  }

  function onBack() {
    setCurrentView('main')
  }

  return (
    <Dialog PaperProps={ { style: { margin: 0, maxHeight: '100%' }} } open={show}  onClose={onHide} maxWidth='md'>
      
      { currentView === 'comments' ? <CommentsHeader onHide={hide} onBack={onBack}/>
      : currentView === 'likes'    ? <LikesHeader onHide={hide} onBack={onBack}/>
      : <MainHeader post={post} onHide={hide}/>}
      
      <DialogContent>
        { currentView === 'comments' ? <CommentsContent dimensions={dimensions} post={post}/>
        : currentView === 'likes'    ? <LikesContent dimensions={dimensions} likes={likes}/>
        : <img 
              ref={el => { ref.current = el; setRefVisible(!!el); }}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}
              src={post.image}
              alt=""
          />
        }
      </DialogContent>

      <DialogContentText className={classes.message}>
        { currentView === 'comments' ? null 
        : currentView === 'likes'    ? null 
        : <Message post={post} />
        }
      </DialogContentText>

      <MainFooter 
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
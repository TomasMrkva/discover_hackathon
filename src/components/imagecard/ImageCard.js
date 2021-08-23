import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { MainHeader, Message, MainFooter } from './main'
import { LikesHeader, LikesContent } from './likes';

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

  const ref  = useRef(null)
  const [dimensions, setDimentions] = useState({})
  const [refVisible, setRefVisible] = useState(false)
  const [currentView, setCurrentView] = useState('main')

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
      
      { currentView === 'comments' ? <div/> 
      : currentView === 'likes'    ? <LikesHeader onHide={hide} onBack={onBack}/>
      : <MainHeader post={post} onHide={hide}/>}
      
      <DialogContent>
        { currentView === 'comments' ? <div/> 
        : currentView === 'likes'    ? <LikesContent dimensions={dimensions} post={post}/>
        : <img 
              ref={el => { ref.current = el; setRefVisible(!!el); }}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain"}}
              src={post.image}
              alt=""
          />
        }
      </DialogContent>

      <DialogContentText>
        { currentView === 'comments' ? <div/> 
        : currentView === 'likes'    ? <div/> 
        : <Message post={post}/>
        }
      </DialogContentText>

      { currentView === 'comments' ? <div/> 
      : currentView === 'likes'    ? <div/> 
      : <MainFooter 
          post={post} 
          setCurrentView={setCurrentView}
          onHide={hide}
          setLoading={setLoading}
        />
      }
    </Dialog>
  )

}
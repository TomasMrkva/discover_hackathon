import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { IconButton, Divider, List, ListItem, ListItemText, ListItemAvatar, 
    Avatar, TextField, CardHeader, ListItemSecondaryAction } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { addComment, deleteComment, seenComments } from '../../firebase_operations';
import { useAuth } from '../../contexts/AuthContext'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    header: {
      padding: 10
    },
    likeDelete: {
        padding: '12px 6px 12px 6px'
    },
    comment: {
        padding: '12px 6px 12px 12px'
    },
    addComment: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#ffff',
        position: '-webkit-sticky', // eslint-disable-next-line
        position: 'sticky',
        top: 0,
        zIndex: 1
    },
    textField: {
        marginTop: '10px',
        marginLeft: '20px',
        marginBottom: '20px',
        width: '80%',
    },
    sendButton: {
        color: 'black'
    },
    deleteButton: {
        paddingBottom: '50px',
        color: 'black',
        '&:hover': {
            color: '#000000a6',
            backgroundColor: 'rgb(0 0 0 / 0%)'
        },
    },
    commentText: {
        wordBreak: 'break-word'
    }, 
    listItem: {
        paddingLeft: '12px',
        paddingRight: '12px'
    }
}));

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
      },
    },
  })(TextField);

export function CommentsHeader({onHide, onBack}) {

    const classes = useStyles();

    return(
        <CardHeader className={classes.header}
            action={
                <IconButton aria-label="close" onClick={onHide}>
                    <CloseIcon style={{color: 'black'}}/>
                </IconButton>
            }
            title={ 
                <> 
                    <IconButton style={{paddingTop: 7.3}} aria-label="back" onClick={onBack}>
                        <ArrowBackIosIcon style={{color: 'black'}}/>
                    </IconButton>
                        Comments
                </> 
            }
        />
    )
}

export function CommentsContent({post, dimensions, comments, setComments, setNewComments}) {

    const [typedComment, setTypedComment] = useState('');
    const classes = useStyles();
    const { currentUser } = useAuth()

    useEffect(() => {
        seenComments(post.id, currentUser)
        var e = document.getElementById('content-page');
        e.scrollTop = 0;
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    function uploadComment() {
        typedComment !== '' 
        && addComment(currentUser, post.id, setComments, typedComment)
        && setTypedComment('')
    }

    function deleteCommentHandler(commentToDelete) {
        setComments(comments.filter(el => el.id !== commentToDelete.id))
        deleteComment(commentToDelete, post.id)
    }

    return(
        <div style={{minWidth: isMobile ? dimensions.width || '100vw' : '50vw', minHeight: dimensions.height+20.25 || '95vh'}}>
            { comments !== undefined &&
                <div style={{textAlign: 'center'}}>
                    <div className={classes.addComment}>
                        <CssTextField
                            className={classes.textField}
                            id="standard-multiline-flexible-full-width"
                            label="Write a comment...."
                            multiline
                            maxRows={55}
                            value={typedComment}
                            onChange={(event) => setTypedComment(event.target.value)}
                            variant="standard"
                        />
                        <IconButton className={classes.sendButton} onClick={uploadComment}>
                            <SendIcon/>
                        </IconButton>
                    </div>
                    <List>
                        { comments.map((el,i) => {
                            return(
                                <React.Fragment key={i}>
                                    <ListItem className={classes.listItem}>
                                        <ListItemAvatar>
                                        <Avatar alt="avatar" src={el.author.avatar} >
                                            {el.author.name.charAt(0)}
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText 
                                            className={classes.commentText}
                                            primary={<Typography display='inline' style={{lineHeight: 0, fontWeight: 600}} variant="body1">{el.author.name}</Typography>}
                                            secondary={
                                                <React.Fragment >
                                                    <Typography display='inline' variant="caption">{' @ ' + el.dateTime}</Typography>
                                                    <Typography component={'span'} style={{color: 'black'}} display='block' variant="body2">{el.comment}</Typography>
                                                </React.Fragment>
                                            }
                                        />
                                        {currentUser.email === el.author.email &&
                                        <ListItemSecondaryAction>
                                            <IconButton 
                                                disableRipple
                                                edge="end" 
                                                aria-label="delete" 
                                                className={classes.deleteButton} 
                                                onClick={() => deleteCommentHandler(el)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                        }
                                    </ListItem>
                                    <Divider variant="middle" component="li"/>
                                </React.Fragment>
                            )
                        })}
                    </List>
                </div>
            }
        </div>
    )
}
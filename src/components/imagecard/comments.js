import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { IconButton, Divider, List, ListItem, ListItemText, 
    ListItemAvatar, Avatar, TextField, CardHeader } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getCommentsByPostId } from '../../firebase_operations';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { addComment, deleteComment } from '../../firebase_operations';
import { useAuth } from '../../contexts/AuthContext'

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
    commentText: {
        wordBreak: 'break-word'
    }, 
    listItem: {
        paddingLeft: '12px',
        paddingRight: '12px'
    }
}));

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
                    <IconButton aria-label="back" onClick={onBack}>
                        <ArrowBackIosIcon style={{color: 'black'}}/>
                    </IconButton>
                    Comments
                </> 
            }
        />
    )
}

export function CommentsContent({post, dimensions}) {

    const [comments, setComments] = useState();
    const [typedComment, setTypedComment] = useState('');
    const classes = useStyles();
    const { currentUser } = useAuth()

    useEffect(() => {
        const unsubscribe = getCommentsByPostId(post.id, setComments)
        return () => {
            unsubscribe()
            setComments([])
        }
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
        <div style={{minWidth: dimensions.width, minHeight: dimensions.height+20.25}}>
            {comments === undefined ? 
                null :
                <>
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
                                        <Avatar>
                                            <img alt="avatar" 
                                                src={el.author.avatar} 
                                                style={{width: '100%', height: '100%'}}/>
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText 
                                            className={classes.commentText}
                                            primary={el.author.name}
                                            secondary={el.comment}
                                        />
                                        {currentUser.email === el.author.email &&
                                            <IconButton 
                                                className={classes.sendButton} 
                                                onClick={() => deleteCommentHandler(el)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    </ListItem>
                                    <Divider variant="middle" component="li"/>
                                </React.Fragment>
                            )
                        })}
                    </List>
                </>
            }
        </div>
    )
}
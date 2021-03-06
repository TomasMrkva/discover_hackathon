import React,{useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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
}));

export function LikesHeader({onHide, onBack}) {
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
                    Likes
                </> 
            }
        />
    )
}


const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);


export function LikesContent({dimensions, likes}) {

    useEffect(() =>{
        var e = document.getElementById('content-page');
        e.scrollTop = 0;
    },[])

    return(
        <div style={{minWidth: isMobile ? dimensions.width || '100vw' : '50vw', minHeight: dimensions.height+20.25 || '95vh'}}>
            <List>
                {likes.map((el,i) => {
                    return(
                        <React.Fragment key={i}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar alt="avatar" src={el.avatar}>
                                    {/* <img  style={{width: '100%', height: '100%'}}/> */}
                                    {el.name.charAt(0)}
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={el.name} secondary={el.email} />
                            </ListItem>
                            <Divider variant="middle" component="li"/>
                        </React.Fragment>
                    )
                })}
            </List>
        </div>
    )
}
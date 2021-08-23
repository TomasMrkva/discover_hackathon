import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
    avatar: {

    }
}));

export function LikesHeader({onHide, onBack}) {

    const classes = useStyles();

    return(
        <CardHeader className={classes.header}
            action={
                <IconButton aria-label="close" onClick={onBack}>
                    <CloseIcon style={{color: 'black'}}/>
                </IconButton>
            }
            title={ 
                <> 
                    <IconButton aria-label="close" onClick={onHide}>
                        <ArrowBackIosIcon style={{color: 'black'}}/>
                    </IconButton>
                    Likes
                </> 
            }
        />
    )
}

export function LikesContent({post, dimensions}) {

    return(
        <ul style={{minWidth: dimensions.width, minHeight: dimensions.height}}>
        </ul>
    )
}
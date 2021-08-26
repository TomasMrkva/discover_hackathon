import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { useAuth } from '../contexts/AuthContext'



const StyledBadge = withStyles((theme) => ({
  badge: {
      backgroundColor: '#5596fe'
  },
}))(Badge);


const useStyles = makeStyles((theme) => ({
    title: {
      color: theme.palette.primary.light,
    },
    root: {
        position: 'relative !important',
        height: '40px',
        bottom: '44px',
        fontSize: '0.85rem'
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: '#ff634778',
    }
  }));


export default function Image({post, posts, setPosts, imageClick, commentClick,...rest}) {

    const[loaded, setLoaded] = useState(false)
    const classes = useStyles();
    const { currentUser } = useAuth()

    return(
        <div id='image' style={loaded ? {} : {display: 'none'}} >
            <img
                style={{width: '100%', height: '100%'}}
                key={rest.key}
                src={post.image}
                alt="" 
                id='image' 
                onClick={() => imageClick(post)}
                onLoad={() => setLoaded(true)} 
            />
            <ImageListItemBar
              title={post.message}
              className={classes.root}
              actionIcon={
                // <div style={{display: 'inline-flex'}}>
                // <IconButton style={{padding: '0px 5px 0px 12px'}} className={classes.icon} aria-label={`star ${'title'}`}>
                //     <div>
                //         <FavoriteIcon />
                //     </div>
                // </IconButton>
                <IconButton onClick={() => commentClick(post)} style={{padding: '0px 12px 0px 5px', color: '#bababa'}} className={classes.icon}>
                    <StyledBadge badgeContent=
                        { post.comments.map(comment => 
                            comment.seen ? 
                            (comment.seen.includes(currentUser.email) ? 0 : 1) 
                            : 1).reduce((a, b) => a + b, 0)} color="primary">
                        <CommentIcon/>
                    </StyledBadge>
                </IconButton>
                // </div>
              }
            />
        </div>
    )
}
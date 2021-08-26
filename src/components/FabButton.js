import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(12),
      right: theme.spacing(2),
      zIndex: 2
    },
  }));
  


export default function FabButton({clickHandler}) {
    const classes = useStyles();
    return (
        <Fab variant="extended" style={{background: 'linear-gradient(-20deg, rgb(183, 33, 255) 0%, rgb(33, 212, 253) 100%)', color: 'white'}} aria-label="add" className={classes.fab} onClick={clickHandler} elevation={4}>
            New Post
            <AddIcon style={{marginLeft: '5px'}}/>
        </Fab>
    );
}
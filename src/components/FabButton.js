import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));
  


export default function FabButton({clickHandler}) {
    const classes = useStyles();
    return (
        <Fab variant="extended" style={{backgroundColor: 'black', color: 'white'}} aria-label="add" className={classes.fab} onClick={clickHandler} elevation={4}>
            Add Post
            <AddIcon style={{marginLeft: '5px'}}/>
        </Fab>
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },
  spinner: {
    color: 'black'
  }
}));


export default function Loading(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner}/>
    </div>
  )
} 
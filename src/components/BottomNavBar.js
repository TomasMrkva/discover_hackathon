import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ImageIcon from '@material-ui/icons/Image';
import EqualizerIcon from '@material-ui/icons/Equalizer';

const useStyles = makeStyles({
  root: {
    width: '100%',
    zIndex: 1,
    position: 'fixed',
    bottom: 0,
    left: 0,
  },
});

export default function LabelBottomNavigation({page, setPage}) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  return (
    <BottomNavigation style={{height: '80x'}}value={page} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Posts" value="posts" icon={<ImageIcon />} onClick={() => console.log()}/>
      <BottomNavigationAction label="Leaderboard" value="leaderboard" icon={<EqualizerIcon />} onClick={() => console.log()}/>
    </BottomNavigation>
  );
}
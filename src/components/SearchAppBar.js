import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { SignOut } from './UserLogin'
import { useAuth } from '../contexts/AuthContext'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '10ch',
      '&:focus': {
        width: '28.5ch',
      },
    },
  },
}));

export default function SearchAppBar({search, setSearch, showSearch, ...props}) {

  const classes = useStyles();
  const { currentUser } = useAuth()

  return (
    <div className={classes.root}>
      <AppBar style={{backgroundColor: 'black'}}>
        <Toolbar>
          <SignOut/>
          <Typography className={classes.title} variant="h6" noWrap>
            Hi, {currentUser.displayName}
          </Typography>
          {
            showSearch &&
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase 
                placeholder="Search…"
                classes={{ root: classes.inputRoot, input: classes.inputInput}}
                onChange={(event) => setSearch(event.target.value)}
                value={search}
              />
            </div>
          }
        </Toolbar>
      </AppBar>
      <Toolbar/>
    </div>
  );
}

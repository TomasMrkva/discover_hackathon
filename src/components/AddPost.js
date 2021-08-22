import React, {useState, useRef} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { addPost } from '../firebase_operations';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import imageCompression from 'browser-image-compression';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundImage: 'linear-gradient(-20deg, rgb(183, 33, 255) 0%, rgb(33, 212, 253) 100%)'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  text: {
    margin: theme.spacing(3)
  },
  input: {
    display: "none"
  },
  button: {
    textAlign: "end",
    marginRight: theme.spacing(3)
  },
  imageContainer: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(3),
    width: '75vw',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPost({show, onHide, setLoading}) {
    const classes = useStyles();
    const fileInput = useRef(null);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [started, setStarted] = useState(false);

    const { currentUser } = useAuth()

    function submitHandler() {
        if (!message) {
          alert('You need to provide a message with your post!')
          return
        } else if (!image){
          alert('You need to upload a picture with your post!')
          return
        }
        addPost(message, image, setLoading, currentUser)
        onHide()
    }

    async function handleFileSelected(event) {
      const imageFile = event.target.files[0];
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true
      }
      try {
        const compressedFile = await imageCompression(imageFile, options);
        setImage(compressedFile)
      } catch (error) {
        console.log(error);
      }
    }

    function changeHandler(event) {
      !started && setStarted(true)
      setMessage(event.target.value)
    }

    return (
    <div>
      <Dialog fullScreen open={show} onClose={onHide} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onHide} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create a new post
            </Typography>
            <Button autoFocus color="inherit" onClick={submitHandler}>
              upload
            </Button>
          </Toolbar>
        </AppBar>
        <TextField className={classes.text}
          error={message === "" && started}
          helperText={message === "" && started ? 'Message is requred!' : ''}        
          id="filled-multiline-static"
          label="Your message"
          multiline
          rows={4}
          variant="filled"
          value={message}
          required
          onChange={changeHandler}
        />
        <div className={classes.button}>
          <input ref={fileInput} accept="image/*" className={classes.input} id="contained-button-file" type="file" onChange={handleFileSelected}/>
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Choose Image
            </Button>
          </label>
        </div>
        <div className={classes.imageContainer}>
          <img className={classes.image} src={image ? URL.createObjectURL(image) : "placeholder.png"} alt="selected"/>
        </div>
      </Dialog>
    </div>
    )
}
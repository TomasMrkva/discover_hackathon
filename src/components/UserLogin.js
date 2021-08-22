import GoogleButton from 'react-google-button'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router'
import { useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Tooltip } from '@material-ui/core'

export function SignIn() {

    const { signIn } = useAuth()
    const history = useHistory()

    const handleOnClick = async () => {
        await signIn().catch(error => console.log(error))
        history.push('/')
    }

    useEffect(() => document.body.style.backgroundImage = 'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)', [])
    
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
            <GoogleButton style={{fontSize: '18px'}}type="light" onClick={ () => handleOnClick() }>Sign in with google</GoogleButton>
        </div>
    )
}

export function SignOut() {

    const { signOut } = useAuth()
    const history = useHistory()

    const handleOnClick = async () => {
        await signOut()
        history.push('/signup')
    }
    
    return (
        <Tooltip title="Sign Out">
            <IconButton
                edge="start"
                color="inherit"
                aria-label="avatar"
                onClick={() => handleOnClick()}
            >
                <ExitToAppIcon />
            </IconButton>
        </Tooltip>
    )
}





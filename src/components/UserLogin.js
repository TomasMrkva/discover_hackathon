import GoogleButton from 'react-google-button'
import { useAuth } from '../contexts/AuthContext'
import { Button, Container } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { useEffect } from 'react'

export function SignIn() {

    const { signIn } = useAuth()
    const history = useHistory()

    const handleOnClick = async () => {
        await signIn().catch(error => console.log('sign in error occured'))
        history.push('/')
    }

    useEffect(() => document.body.style.backgroundImage = 'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)', [])
    
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
            <GoogleButton style={{fontSize: '18px'}}type="light" onClick={ () => handleOnClick() }>Sign in with google</GoogleButton>
        </Container>
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
        <Button onClick={() =>handleOnClick()}>Sign out</Button>
    )
}





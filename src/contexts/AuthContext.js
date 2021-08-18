import React,{useContext, useState, useEffect} from 'react'
import { Spinner, Container } from 'react-bootstrap'
import { googleProvider, auth } from '../firebase'


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function signIn() {
        return auth.signInWithPopup(googleProvider)
    }

    function signOut() {
        return auth.signOut()
    }

    const value = {
        currentUser,
        loading,
        signIn,
        signOut,
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        });
        return unsubscribe
    }, [])


    if(loading) {
        return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
        )
    } else {
        return (
            <>
                { loading ? 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                :
                    <AuthContext.Provider value={value}>
                        {children}
                    </AuthContext.Provider>
                }
            </>
        )
    }
}

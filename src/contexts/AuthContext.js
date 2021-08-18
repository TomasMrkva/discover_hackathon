import React,{useContext, useState, useEffect} from 'react'
import { googleProvider, auth } from '../firebase'
import Loading from '../components/Loading'

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
        signIn,
        signOut,
    }

    useEffect(() => {
        setLoading(true)
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoading(false)
        });
        return unsubscribe
    }, [])


    return (
        <>
            { loading ? 
                <Loading />
            :
                <AuthContext.Provider value={value}>
                    {children}
                </AuthContext.Provider>
            }
        </>
    )
}

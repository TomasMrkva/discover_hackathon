import { useAuth } from "./contexts/AuthContext"
import Skeleton from "./components/pages/Skeleton"
import Unauthorized from "./components/pages/Unauthorized"
import { getUsers } from "./firebase_operations";
import Loading from "./components/Loading";
import React, { useState, useEffect } from 'react'


export default function AuthorizationWall() {
    
    const [loadingUsers, setLoadingUsers] = useState(true); 
    const [users, setUsers] = useState([])
    
    const { currentUser } = useAuth()
    
    
    useEffect(() => {
        document.body.style.backgroundImage = ''
        getUsers(setLoadingUsers, setUsers)
        return() => {
            setUsers([])
        }
      },[]) // eslint-disable-line react-hooks/exhaustive-deps

    if (loadingUsers) {
        return <Loading/>
    }

    return (
        users.includes(currentUser.email) ? <Skeleton/> : <Unauthorized/>
    )
}
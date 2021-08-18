import { useAuth } from "../contexts/AuthContext"
import AuthorizedView from "./views/AuthorizedView"
import UnauthorizedView from "./views/UnAuthorizedView"
import { getUsers } from "../firebase_operations";
import Loading from "./Loading";
import React, { useState, useEffect } from 'react'


export default function MainPage() {
    
    const [loadingUsers, setLoadingUsers] = useState(true); 
    const [users, setUsers] = useState([])
    
    const { currentUser } = useAuth()
    
    
    useEffect(() => {
        document.body.style.backgroundImage = ''
        getUsers(setLoadingUsers, setUsers)
      },[]) // eslint-disable-line react-hooks/exhaustive-deps

    if (loadingUsers) {
        return <Loading/>
    }

    return (
        users.includes(currentUser.email) ? <AuthorizedView/> : <UnauthorizedView/>
    )
}
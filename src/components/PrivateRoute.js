import { useAuth } from '../contexts/AuthContext'
import { Redirect, Route } from 'react-router-dom'
import React from 'react'

export default function PriavateRoute({component: Component,...rest}) {

    const { currentUser } = useAuth()

    return (
        <Route {...rest} render={props => {
            
            return (currentUser ? 
                    <Component {...props}/> 
                : <Redirect to='/signup'/>)
            }}/>  
        )
}

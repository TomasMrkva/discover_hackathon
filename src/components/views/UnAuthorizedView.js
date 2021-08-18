import { SignOut } from "../UserLogin"
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

export default function UnAuthorizedView() {

  const { currentUser } = useAuth()

    return(
      <div 
        className="d-flex justify-content-center align-items-center" 
        style={{minHeight: '100vh', textAlign:'center', flexDirection:'column'}} >

        <h1>Hello {currentUser.displayName}!</h1>
        <h2>Unfortunately, you are not authorized to use this website</h2>
        <SignOut/>

      </div>
    )
}
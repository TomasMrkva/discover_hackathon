import React from 'react'
import MainPage from './components/MainPage'
import PriavateRoute from './components/PrivateRoute'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'
import { SignIn } from './components/UserLogin'

export default function App() {
  return(
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path='/signup' component={SignIn}></Route>
          <PriavateRoute exact path='/' component={MainPage}></PriavateRoute>
        </Switch>
      </AuthProvider>
  </Router>
  )
}
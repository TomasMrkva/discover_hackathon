import React from 'react'
import './css/App.css';
import AuthorizationWall from './AuthorizationWall'
import PriavateRoute from './components/PrivateRoute'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'
import { SignIn } from './components/UserLogin'
import { createTheme , ThemeProvider } from '@material-ui/core/';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#000000'
    },
  }
})

export default function App() {
  return(
  <ThemeProvider theme={theme}>
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path='/signup' component={SignIn}></Route>
          <PriavateRoute exact path='/' component={AuthorizationWall}></PriavateRoute>
        </Switch>
      </AuthProvider>
    </Router>
  </ThemeProvider>
  )
}


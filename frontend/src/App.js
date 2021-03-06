import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'

import MainNavigation from './components/Navigation/MainNavigation'
import AuthContext from './context/auth-context'

const MainContent = styled.main`margin: 4rem 2.5rem;`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      token: null,
      userId: null
    }
  }
  login = (token, userId, tokenExpiration) => {
    this.setState({
      token: token,
      userId: userId
    })
  }
  logout = () => {
    this.setState({
      token: null,
      userId: null
    })
  }

  render () {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}
          >
            <MainNavigation />
            <MainContent>
              <Switch>
                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && <Redirect from="/auth" to="/events" exact />}
                {!this.state.token && <Route path="/auth" component={AuthPage} />}
                <Route path="/events" component={EventsPage} />
                {this.state.token && <Route path="/bookings" component={BookingsPage} />}
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </MainContent>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default App

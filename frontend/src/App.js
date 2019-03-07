import React, { Component } from 'react';
import styled from 'styled-components'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from './pages/Auth'
import EventsPage from './pages/Events'
import BookingsPage from './pages/Bookings'

import MainNavigation from './components/Navigation/MainNavigation'

const MainContent = styled.main`
  margin: 4rem 2.5rem;
`

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <MainNavigation />
          <MainContent>
            <Switch> 
              <Redirect from='/' to='/auth' exact />
              <Route path='/auth' component={AuthPage} />
              <Route path='/events' component={EventsPage} />
              <Route path='/bookings' component={BookingsPage} />
            </Switch>
          </MainContent>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

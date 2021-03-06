import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import AuthContext from '../../context/auth-context'

const MainHeader = styled.header`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  width: 1000%;
  height: 3.5rem;
  background-color: #01d1d1;
  padding: 0 1rem;
  align-items: center;
`

const Logo = styled.div`
  margin: 0;
  font-size: 1rem;
`

const Items = styled.nav`
  margin-left: 1.5rem;
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    margin: 0 1rem;
    align-items: center;
  }
  a, button {
    text-decoration: none;
    color: #000;
    border: none;
    font: inherit;
    background: transparent;
    cursor: pointer;
    vertical-align: middle;
    margin: 0;
  }
  a:hover, a:active, a.active, button:hover, button:active{
    color: #f8e264;
  }
`

const mainNavigation = props => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <MainHeader>
          <Logo>
            <h1>EasyEvent</h1>
          </Logo>
          <Items>
            <ul>
              {!context.token && (
                <li>
                  <NavLink to='/auth'>Authenticate</NavLink>
                </li>
              )}
              <li> 
                <NavLink to='/events'>Events</NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                  <li> 
                    <NavLink to='/bookings'>Bookings</NavLink>
                  </li>
                  <li> 
                    <button onClick={context.logout}>Logout</button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </Items>
        </MainHeader>
      )
    }}
  </AuthContext.Consumer>
)

export default mainNavigation
import React, { Component } from 'react'
import styled from 'styled-components'

import AuthContext from '../context/auth-context'
import { Control, Actions } from '../components/Styled/FormStyled'

const AuthForm = styled.form`
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;
`


class AuthPage extends Component {

  static contextType = AuthContext

  constructor(props) {
    super(props)
    this.emailEl = React.createRef()
    this.passwordEl = React.createRef()
    this.state = {
      isLogin: true
    };
  }

  submitHandler = (e) => {
    e.preventDefault()
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if(email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: ` 
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    }
    if(!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {
              email: "${email}",
              password: "${password}"
            }) {
              _id
              email
            }
          }
        `
      }
    }

    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res.status)
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      if(resData.data.login.token) {
        this.context.login(
          resData.data.login.token, 
          resData.data.login.userId, 
          resData.data.login.tokenExpiration
        )
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  switchModeHeadler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin }
    })
  }

  render() {
    return (
     <AuthForm onSubmit={this.submitHandler}>
      <Control>
        <label htmlFor='email'>E-mail</label>
        <input type='email' id='email' ref={this.emailEl}/>
      </Control>
      <Control>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' ref={this.passwordEl}/>
      </Control>
      <Actions>
        <button type="submit">Submit</button>
        <button type="button" onClick={this.switchModeHeadler}>
          Switch to {this.state.isLogin ? 'Signup' : 'Login'}
        </button>
      </Actions>
     </AuthForm>
    )
  }
}

export default AuthPage
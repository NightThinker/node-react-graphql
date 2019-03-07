import React, { Component } from 'react'
import styled from 'styled-components'

const AuthForm = styled.form`
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;
`

const Control = styled.div`
  margin-bottom: 1rem;
  label {
    margin-bottom: 0.5rem;
  }
  label, input {
    width: 100%;
    display: block;
  }
`
const Actions = styled.div`
  button {
    background: #01d1d1;
    font: inherit;
    border: 1px solid #01d1d1;
    border-radius: 5px;
    padding: 0.25rem 1rem;
    margin: 0 1rem;
    margin-right: 1rem;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.25);
    color: #fff;
    cursor: pointer;
    &:hover, &:active {
      background: #01a7a7;
      border-color: #01a7a7;
    }
  }
`

class AuthPage extends Component {
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
      console.log(resData)
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
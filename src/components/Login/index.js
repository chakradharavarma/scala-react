import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Card, Typography, TextField } from '@material-ui/core';
import { logInSuccess } from '../../actions/authActions'
import { Auth } from 'aws-amplify'

class Login extends Component {

  state = {
    username: '',
    password: '',
    needsVerification: false,
    error: null,
  }
  
  handleChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }

  handleSubmit = async () => {
    const { username, password } = this.state;
    await Auth.signIn(username, password)
      .catch(err => {
        if(err.code === 'UserNotConfirmedException') {
          this.setState({ needsVerification: true, username })
        }else {
          this.setState({ error: err.message })
        }
      })
    const payload = await Auth.currentAuthenticatedUser()
      .catch(err => err)
    if(typeof payload === 'string' || payload instanceof String) {
      this.setState({ error: payload })
    }
    else if(typeof payload === 'object' || payload instanceof Object) {
      this.props.handleLogInSuccess(payload)
    } else {
      console.log(payload)
      console.log(typeof payload)
      alert("what is going on? check console.");
      // todo remove
    }
  }

  render() {
    const { error, needsVerification, username } = this.state;
    const { user } = this.props

    if(!user || user.fetching) {
      return null
    } 

    if(needsVerification) {
      return (
        <Redirect to={{
          pathname: '/verify',
            state: {
              redirect: true,
              username: username
            }
          }}
        />
      )
    }

    if(user.fetched) {
      if(user.data.attributes.email_verified) {
        return <Redirect to='/' />
      }
      return <Redirect to='/verify' />
    }

    return (
      <div className="auth-container">
        <Card className='auth-card'>
          <Typography className='auth-card-title' color='secondary' variant='headline'>
            Login
          </Typography>
          <div className='auth-fields'>
            <TextField
              onChange={this.handleChange('username')}
              label="Username"
              type="username"
              margin="normal"
            />
            <TextField
              onChange={this.handleChange('password')}
              label="Password"
              type="password"
              margin="normal"
            />
            <div className='error-helper-text'>
              { error }
            </div>
          </div>
          <Button variant='contained' color='secondary' onClick={this.handleSubmit}>
            Log In
          </Button>

        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogInSuccess: (user) => dispatch(logInSuccess(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
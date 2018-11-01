import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, Typography, TextField } from '@material-ui/core';
import { logIn } from '../../actions/authActions'

class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  handleChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }

  handleLogin = async () => {
    const { username, password } = this.state;
    this.props.handleLogin(username, password)
  }

  render() {
    const { user } = this.props;
    if(user.data) {
      return (
        <Redirect to='/' />
      )
    }
    if(user.verification.username && !user.verification.verified) {
      return (
        <Redirect to='/verify' />
      )
    }

    return (
      <div className="auth-container">
        <Card className='auth-card centered' >
          <Typography className='auth-card-title' color='secondary' variant='headline'>
            WELCOME BACK TO THE SCALA PLATFORM
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
              { user.error ? user.error.message : "" }
            </div>
          </div>
          <div className='auth-buttons'>
            <Button className='auth-button' variant='contained' color='secondary' onClick={this.handleLogin}>
              Log In
          </Button>
            <Link className='auth-link' to='/register'>
              <Button className='auth-button' variant="outlined" >
                Register
            </Button>
            </Link>
          </div>

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
    handleLogin: (username, password) => dispatch(logIn(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
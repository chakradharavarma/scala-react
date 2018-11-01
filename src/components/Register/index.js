import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, Typography, TextField } from '@material-ui/core';
import { register } from '../../actions/authActions'

class Register extends Component {

  state = {
    email: '',
    password: '',
  }

  handleChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }

  handleRegister = () => {
    const { username, email, password } = this.state;
    const { handleRegister } = this.props;
    handleRegister(username, password, email)
  }

  render() {
    const { user } = this.props;

    if(user.verification.username) {
      if(user.verification.verified) {
        return <Redirect to='/' />
      } else {
        return <Redirect to='/verify' />
      }
    }

    return (
      <div className="auth-container">
        <Card className='auth-card centered'>
          <Typography className='auth-card-title' color='secondary' variant='headline'>
            Welcome to the Scala Platform
          </Typography>
          <div className='auth-fields'>
            <TextField
              onChange={this.handleChange('username')}
              label="Username"
              type="text"
              margin="normal"
            />
            <TextField
              onChange={this.handleChange('email')}
              label="Email"
              type="email"
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
            <Button className='auth-button' variant='contained' color='secondary' onClick={this.handleRegister}>
              Register
          </Button>
            <Link className='auth-link' to='/login'>
              <Button className='auth-button' variant="outlined" >
                Login
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
    handleRegister: (username, password, email) => dispatch(register(username, password, email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Card, Typography, TextField } from '@material-ui/core';
import { register } from '../../common/cognito'
import { handleRegister } from '../../actions/authActions'
import { Auth } from 'aws-amplify'

class Register extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }
  
  handleSubmit = () => {
    const { email, password } = this.state;
    const { handleRegister } = this.props;
    const username = email.substring(0, email.indexOf('@'))

    Auth.signUp({
				username: username,
        password: password,
        attributes: {
          email: email
        }
      })
      .then(user => handleRegister(user))
      .catch(err => this.setState({message: err.message}))

    /*
    register(username, password, email, function(err, user){
      if(err) {
        this.setState({error: err.message})
      }else {
        debugger;
        handleRegister(user)
      }
      
    }.bind(this));*/
  }

  render() {
    const { message } = this.state;
    const { user } = this.props;
    if(user.data) { 
      return <Redirect to='/verify' />
    }
    return (
      <div className="auth-container">
        <Card className='auth-card'>
          <Typography className='auth-card-title' color='secondary' variant='headline'>
            Welcome to the Scala Platform
          </Typography>
          <div className='auth-fields'>
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
            <div className='helper-text'>
              { message }
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
    handleRegister: (user) => dispatch(handleRegister(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
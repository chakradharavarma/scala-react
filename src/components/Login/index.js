import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Typography, TextField } from '@material-ui/core';
import { logInSuccess } from '../../actions/authActions'
import { Auth } from 'aws-amplify'

class Login extends Component {

  state = {
    username: 'ari',
    password: 'Test1234',
    error: null,
  }

  componentDidMount() {
    //confirmRegistration('ari', '386051')
    //this.handleSubmit();
  }

  handleChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }

  handleSubmit = async () => {
    const { username, password } = this.state;
    Auth.signIn(username, password)
      .then(user => {
        return user
      })
      .catch(err => this.setState({ error: err.message }))

      /*
    login(username, password, (user, err) => {
      if(err) {
        switch(err.message) {
          case "UserNotConfirmedException":

            break;
          default:
            break;
        }
        this.setState({error: err.message})
        return
      }
      alert(user)
    })*/
  }

  render() {
    const { user, error } = this.state;
    if(user) {
      
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
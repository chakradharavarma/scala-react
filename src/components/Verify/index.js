import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Button, Card, Typography } from '@material-ui/core';
import ReactCodeInput from 'react-code-input'
import { confirmRegistration } from '../../common/cognito'

class VerifyAccount extends Component {

  constructor(props) {
    super(props)
    const { user, location } = this.props;

    let username;
    if(user.data && user.data.user) {
      username = user.data && user.data.user.username
    }
    else if (location.state && location.state.username) {
      username = location.state.username;
    } 

    this.state = {
        code: '',
        username: username,
        error: null,
    }
  }

  handleChange = code => {
    this.setState({ code })
  }


  handleResendCode = async () => {
    const { username } = this.state;
    debugger;
    await Auth.resendSignUp(username)
      .then(data => {
        debugger;
        console.log(data)
      }).catch(err => {
        debugger;
        this.setState({ error: err.message })
      })

  }

  handleSubmit = () => {
    const { code, username } = this.state;
    confirmRegistration(username, code, (err, result) => {
      if(err) {
        if(err.message === 'User cannot be confirm. Current status is CONFIRMED') {
          this.setState({ redirect: '/login'})
          return
        }else {
          this.setState({ error: err.message })
        }
      } else if(result === 'SUCCESS') {
        this.setState({ redirect: '/login' })
      }else {
        console.log(result);
        alert("check the log for the result")
      }
    })
  }

  render() {
    const { error, username, redirect } = this.state;

    if(redirect) {
      return (
        <Redirect to={redirect} />
      )
    }
    
    if(!username ) {
      return (
        <Redirect to='/register' />
      )
    }

    return (
      <div className="auth-container">
        <Card className='auth-card'>
          <Typography className='auth-card-title' color='secondary' variant='headline'>
            Enter your verification code
          </Typography>
          <div className='auth-fields'>
          <ReactCodeInput onChange={this.handleChange} type='text' fields={6} />
            <div className='error-helper-text'>
              { error }
            </div>
          </div>
          <div className='spaced-buttons'>
          <Button variant='contained' color='secondary' onClick={this.handleSubmit}>
              Verify
          </Button>
          <Button variant='contained' color='secondary' onClick={this.handleResendCode}>
              Resend Code
          </Button>
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

export default connect(mapStateToProps)(VerifyAccount);
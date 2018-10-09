import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Typography, TextField } from '@material-ui/core';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { COGNITO_CONFIG } from '../../common/consts'
import ReactCodeInput from 'react-code-input'
import { confirmRegistration } from '../../common/cognito'

const userPool = new CognitoUserPool(COGNITO_CONFIG);


class VerifyAccount extends Component {

  state = {
    code: ''
  }

  handleChange = code => {
    this.setState({
      code
    })
  }

  handleSubmit = () => {
    const { code} = this.state;
    const { user } = this.props;
    debugger;
    confirmRegistration(user.data.user.username, code)
  }

  render() {
    const { error} = this.state;
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

export default connect(mapStateToProps)(VerifyAccount);
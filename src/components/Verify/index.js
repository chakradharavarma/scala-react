import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Card, Typography } from '@material-ui/core';
import ReactCodeInput from 'react-code-input'
import { verify, resendCode } from '../../actions/authActions'

class VerifyAccount extends Component {

  handleChange = code => {
    this.setState({ code })
  }

  handleVerifyCode = () => {
    const { handleVerification } = this.props;
    const { user } = this.props
    const { code } = this.state
    handleVerification(user.verification.username, code)


  }

  handleResendCode = () => {
    const { user } = this.props
    const { handleResendCode } = this.props;
    handleResendCode(user.verification.username)
  }

  render() {
    const { user } = this.props;

    if (!user.verification.username || user.verification.verified) {
      return <Redirect to='/' />
    }

    return (
      <div className="auth-container">
        <Card className='auth-card centered'>
          <Typography className='auth-card-title' color='secondary' variant='headline'>
            Enter your verification code
          </Typography>
          <div className='auth-fields'>
          <ReactCodeInput onChange={this.handleChange} type='text' fields={6} />
            <div className='error-helper-text'>
              {  user.error ? user.error.message : '' }
            </div>
          </div>
          <div className='spaced-buttons'>
          <Button className='auth-button' variant='contained' color='secondary' onClick={this.handleVerifyCode}>
              Verify
          </Button>
          <Button className='auth-button' variant='contained' color='secondary' onClick={this.handleResendCode}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    handleVerification: (username, code) => dispatch(verify(username, code)),
    handleResendCode: (username) => dispatch(resendCode(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Typography, TextField } from '@material-ui/core';
import { verifyChallenge } from '../../actions/authActions'

class ChangeUser extends Component {

  state = {
    username: '',
    challenge: '',
  }

  handleChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }
  handleVerifyChallenge = () => {
    const { handleVerification } = this.props;
    const { challenge, username } = this.state;
    handleVerification(challenge, username)
  }

  render() {
    const { error } = this.props.impersonation;

    return (
      <div className="change-user-container">
        <Card className='change-user-card'>
          <Typography className='change-user-card-title' color='secondary' variant='headline'>
            Enter Challenge
          </Typography>
          <div className='change-user-fields'>
            <TextField placeholder='Challenge' onChange={this.handleChange('challenge')} />
            <TextField placeholder='Username' onChange={this.handleChange('username')} />
            <div className='error-helper-text'>
              {  error ? error.message : '' }
            </div>
          </div>
          <div className='centered'>
            <Button variant='contained' color='secondary' onClick={this.handleVerifyChallenge}>
                Verify
            </Button>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    impersonation: state.impersonation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleVerification: (challenge, username) => dispatch(verifyChallenge(challenge, username)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUser);
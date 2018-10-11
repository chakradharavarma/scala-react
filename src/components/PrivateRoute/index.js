import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import { connect } from 'react-redux';
import { handleFetchUser } from '../../actions/authActions';
import AccountMenu from '../AccountMenu'

class PrivateRoute extends Component {


  render() {
    const { user } = this.props

    if(!user.data ) {
      window.location.reload() // todo 
    }

    return (
      <Fragment>
        <AccountMenu/>
        <Route exact path={this.props.path} component={this.props.component} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLocalCognitoUser: () => {
      dispatch(handleFetchUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuthenticator(PrivateRoute));
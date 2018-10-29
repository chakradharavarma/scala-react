import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountMenu from '../AccountMenu'

class PrivateRoute extends Component {

  render() {
    const { user } = this.props

    if(user.fetching) {
      return null
    }

    if(!user.verification.username) {
      return <Redirect to='/login' />
    }

    if(!user.verification.verified) {
      return <Redirect to='/verify' />
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

export default connect(mapStateToProps)(PrivateRoute);
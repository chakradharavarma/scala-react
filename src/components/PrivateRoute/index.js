import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';

class PrivateRoute extends Component {

  render() {
    return (
      <Route exact path={this.props.path} component={this.props.component} />
    );
  }
}


export default withAuthenticator(PrivateRoute);
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Switch, Route } from 'react-router-dom'

import Jobs from '../Jobs';
import Files from '../Files';

export default class DashRight extends Component {

  render() {
    return (
      <div className='dash-right'>
        <div className='dash-right-options'>
          Hi, { this.props.username }
          <FontAwesomeIcon className='dash-icon' icon={faChevronDown} />
        </div>
        <Switch>
          <Route exact path='/' component={Jobs} />
          <Route exact path='/jobs' component={Jobs} />
          <Route exact path='/files' component={Files} />
          <Route exact component={() => <div>not found</div>}/>
        </Switch>
      </div>
    );
  }
}

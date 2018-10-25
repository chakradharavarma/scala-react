import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FontAwesome } from '@fortawesome/react-fontawesome'
import { faServer, faFile, faBuilding, faBars, faPlug, faDesktop, faComment, faClock } from '@fortawesome/free-solid-svg-icons'

class DashLeft extends Component {
  render() {
    const { user } = this.props
    if(!user.data ) {
      return null
    }

    const confirmed = user.data && user.data.userConfirmed;
    if(typeof confirmed === 'boolean' && confirmed === false) {
      return (
        <Redirect to='/verify' />
      ) 
    }

    return (
      <div className='dash-left'>
        <div className='dash-scala-logo' />
        <ul className='dash-links'>
          <Link to='/jobs' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faServer} />
            Jobs
          </Link>
          <Link to='/files' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faFile} />
            Files
          </Link>
          <Link to='/workflows' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faBuilding} />
            Workflows
          </Link>
          <Link to='/schedule' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faClock} />
            Schedule Tasks
          </Link>
          <Link to='/usage' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faBars} />
            Usage
          </Link>
          <Link to='/connections' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faPlug} />
            Connections
          </Link>
          <Link to='/desktops' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faDesktop} />
            Desktops
          </Link>
        </ul>
        <div className='dash-footer'>
          <ul className='dash-footer-links'>
            <Link to='/contact' className='dash-link'>
              <FontAwesome className='dash-link-icon' icon={faComment} />
              Contact
            </Link>
          </ul>
          <p className='dash-copyright-statement'>
            © 2018 Scala Computing.
              <br />
            All rights reserved
            </p>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DashLeft);
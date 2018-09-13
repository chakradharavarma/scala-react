import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as FontAwesome } from '@fortawesome/react-fontawesome'
import { faServer, faFile, faBuilding, faBars, faPlug, faDesktop, faComment, faClock } from '@fortawesome/free-solid-svg-icons'

export default class DashLeft extends Component {
  render() {
    return (
      <div className='dash-left'>
        <div className='dash-scala-logo' />
        <ul className='dash-links'>
          <Link to='/v2/jobs' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faServer} />
            Jobs
          </Link>
          <Link to='/v2/files' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faFile} />
            Files
          </Link>
          <Link to='/v2/workflows' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faBuilding} />
            Workflows
          </Link>
          <Link to='/v2/schedule' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faClock} />
            Schedule Tasks
          </Link>
          <Link to='/v2/usage' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faBars} />
            Usage
          </Link>
          <Link to='/v2/connections' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faPlug} />
            Connections
          </Link>
          <Link to='/v2/desktops' className='dash-link'>
            <FontAwesome className='dash-link-icon' icon={faDesktop} />
            Desktops
          </Link>
        </ul>
        <div className='dash-footer'>
          <ul className='dash-footer-links'>
            <Link to='/v2/contact' className='dash-link'>
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

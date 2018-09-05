import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DesktopCardSection from './DesktopCardSection';

const availableDesktops = [
  {
    name: 'Windows',
    type: 'rdp',
  },
  {
    name: 'Centos (Linux)',
    type: 'vnc',
  },
]

class Desktops extends Component {

  render() {
    const { desktops } = this.props;
    return (
      <Grid container spacing={8} className='desktop-root'>
        <Grid item xs={6}>
          <DesktopCardSection title='Available Desktops' desktops={availableDesktops} />
        </Grid>
        <Grid item xs={6}>
          <DesktopCardSection title='Running Desktops' desktops={desktops && desktops.data.openDesktops.Reservations} runningCard />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    desktop: state.desktops,
    notification: state.desktops.notification,
  }
}

export default connect(mapStateToProps)(Desktops);

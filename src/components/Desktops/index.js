import React, { Component } from 'react';
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
    const { fetching } = desktops;

    return (
      <Grid container spacing={16} className='desktop-root'>
        <Grid item xs={8}>
          <DesktopCardSection title='Running Desktops' fetching={fetching} desktops={desktops.data.openDesktops && desktops.data.openDesktops.Reservations} runningCard />
        </Grid>
        <Grid item xs={4}>
          <DesktopCardSection title='Available Desktops' desktops={availableDesktops} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    desktops: state.desktops,
    notification: state.desktops.notification,
  }
}

export default connect(mapStateToProps)(Desktops);

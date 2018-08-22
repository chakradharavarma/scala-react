import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DesktopCardSection from './DesktopCardSection';
import Snackbar from '../Snackbar';
import { clearMessages } from '../../actions/generalActions';

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

  /*
  componentWillUnmount() {
    this.props.clearMessages();
  }
  */

  render() {
    const { clearMessages, runningDesktops, notification } = this.props;
    return (
      <Fragment>
        <Grid container spacing={8} className='desktop-root'>
          <Grid item xs={6} lg={4}>
            <DesktopCardSection title='Available Desktops' desktops={availableDesktops} />
          </Grid>
          <Grid item xs={6} lg={4}>
            <DesktopCardSection title='Running Desktops' desktops={runningDesktops && runningDesktops.Reservations} runningCard />
          </Grid>
        </Grid>
        <Snackbar
          variant={notification ? notification.type : 'default'}
          message={notification ? notification.message : ''}
          open={notification !== undefined}
          handleClose={clearMessages}
        />

      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessages: () => dispatch(clearMessages()),
  }
}

const mapStateToProps = (state) => {
  return {
    runningDesktops: state.desktops.data.openDesktops,
    notification: state.desktops.notification,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Desktops);

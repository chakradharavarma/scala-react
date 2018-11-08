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
    const { data, fetching } = this.props.desktops;

    return (
      <Grid container spacing={16} className='desktop-root'>
        <Grid item xs={8}>
          <DesktopCardSection title='Running Desktops' fetching={fetching} desktops={data} runningCard />
        </Grid>
        <Grid item xs={4}>
          {
            !fetching &&
            <DesktopCardSection title='Available Desktops' desktops={availableDesktops} />
          }
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    desktops: state.desktops,
  }
}

export default connect(mapStateToProps)(Desktops);

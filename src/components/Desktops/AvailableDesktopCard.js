import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createDesktop } from '../../actions/desktopActions'
class AvailableDesktopCard extends Component {

  render() {
    const { desktop, createDesktop } = this.props;
    const { name, type } = desktop;
    debugger;
    return (
      <Grid item xs={10} >
        <Card elevation={1} className='desktop-card' onClick={createDesktop(type)}>
          <Typography variant='title' className='desktop-card-title'>
            { name }
          </Typography>
        </Card>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDesktop: (type) => () => dispatch(createDesktop(type))
  }
}

export default connect(undefined, mapDispatchToProps)(AvailableDesktopCard)

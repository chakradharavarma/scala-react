import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { runWorkflow } from '../../actions/workflowActions'

class JobsDrawerCard extends Component {

  state = {
    open: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      open,
    });
  };

  render() {
    const { handleClick, workflow, closeDrawer } = this.props;
    return (
      <Grid item xs={10}>
        <Card onClick={handleClick(workflow.id, workflow.name, closeDrawer)}>
          <CardMedia
            image={workflow.image}
            title={`${workflow.image.split('/').pop().split('.')[0]} logo`}
            className='jobs-drawer-card-media' />
          <CardContent>
          <Typography gutterBottom variant="title">
              {workflow.name}
            </Typography>
            <Typography variant='caption'>
              {workflow.id}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

JobsDrawerCard.propTypes = {

};

const mapDispatchToProps = (dispatch) => {
  return (
    {
      handleClick: (id, name, cb) => () => {
        dispatch(runWorkflow(id, name))
        cb()
      }
    }
  )
};

export default connect(undefined, mapDispatchToProps)(JobsDrawerCard);
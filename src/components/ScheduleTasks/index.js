import React, { Component, Fragment } from 'react';
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { connect } from 'react-redux';
import { deleteSchedule } from '../../actions/scheduleActions'
import AddIcon from '@material-ui/icons/Add';
import ScheduleCard from './ScheduleCard';
import ViewSwiper from './ViewSwiper';
import NewCronDrawer from './NewCronDrawer';

const classes = {
  expansionPanelSummary: {
    content: 'create-new-schedule-expander',
    root: 'create-new-schedule-root',
  }
}

class ScheduleTasks extends Component {

  render() {
    const { onClickDelete, schedules, workflows } = this.props;
    return (
      <Fragment>
        <NewCronDrawer />
        {
          false && (
            <ExpansionPanel style={{ padding: '8px 24px', width: '50%' }} >
            <ExpansionPanelSummary classes={classes.expansionPanelSummary}>
              <AddIcon style={{ marginRight: 18 }} color='secondary'/>
              <Typography color='secondary' variant='headline'>
                Create a New Schedule
              </Typography>
            </ExpansionPanelSummary>
  
            <ExpansionPanelDetails style={{ display: 'unset' }} >
              <ViewSwiper />
            </ExpansionPanelDetails>
          </ExpansionPanel>  
          )
        }

        <Card className='section'>
          <Typography color='secondary' variant='headline' className='section-title'>
            Schedules
          </Typography>
          <Divider />
          <Grid className='schedule-container sibling-fade' container spacing={16} >
            {
              schedules.fetched &&
              schedules.data.map((schedule, i) =>
                <ScheduleCard
                  schedule={schedule}
                  workflows={workflows}
                  onClickDelete={onClickDelete}
                  key={`schedule-card-${i}`}/>
              )
            }
          </Grid>
        </Card>
      </Fragment>
    );
  }
}

ScheduleTasks.defaultProps = {
  schedules: [],
  workflows: [],
}

const mapStateToProps = (state) => {
  return (
    {
      schedules: state.schedules,
      workflows: state.availableWorkflows.data
    }
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickDelete: (id) => () => dispatch(deleteSchedule(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTasks);
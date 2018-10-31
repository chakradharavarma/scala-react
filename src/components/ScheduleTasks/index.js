import React, { Component, Fragment } from 'react';
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import ScheduleCard from './ScheduleCard';
import ViewSwiper from './ViewSwiper';
import NewCronDrawer from './NewCronDrawer';
import ScalaLoader from '../ScalaLoader';

const classes = {
  expansionPanelSummary: {
    content: 'create-new-schedule-expander',
    root: 'create-new-schedule-root',
  }
}

class ScheduleTasks extends Component {

  render() {
    const { schedules } = this.props;
    const { fetching, fetched, data } = schedules;
    const drawerTriggerTop = (
      <Button color='secondary'>
        <AddIcon />
        Add a new schedule
      </Button>
    )
    const drawerTriggerEmpty = (
      <Button size='large' variant="contained" color='secondary'>
        Click to create a new schedule
      </Button>
    )
    return (
      <Fragment>
        <NewCronDrawer trigger={drawerTriggerTop} />
        {
          false && (
            <ExpansionPanel style={{ padding: '8px 24px', width: '50%' }} >
              <ExpansionPanelSummary classes={classes.expansionPanelSummary}>
                <AddIcon style={{ marginRight: 18 }} color='secondary' />
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
          {
            fetching ? (
              <ScalaLoader centered active />
            ) :
              fetched &&
                data.length ?
                (
                  <Grid className='schedule-container sibling-fade' container spacing={16} >
                    {
                      data.map((schedule, i) =>
                        <ScheduleCard
                          schedule={schedule}
                          key={`schedule-card-${i}`}
                        />
                      )
                    }
                  </Grid>
                ) :
                (
                  <div className='centered with-height'>
                    <NewCronDrawer trigger={drawerTriggerEmpty} />
                  </div>
                )
          }
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return (
    {
      schedules: state.schedules
    }
  )
};

export default connect(mapStateToProps)(ScheduleTasks);

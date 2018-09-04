import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';

import EditCronModal from '../EditCronModal';

class ScheduleCard extends Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  _handleClose = (beforeClosing) => () => {
    beforeClosing();
    this.setState({ anchorEl: null });
  };

  render() {
    const { onClickDelete, workflows, schedule } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const workflow = workflows.find(workflow => workflow.id === schedule.workflowId);
    if(!workflow) { // TODO move this somewhere nicer ... this means a workflow's been deleted and not its schedules
      onClickDelete(schedule.id);
      return null;
    }
    return (
      <Grid item xs={12} lg={6}  >
        <Card style={{ minHeight: 200 }} >
          <CardContent>
            <div className='workflow-title-container'>
              <Typography color='secondary' gutterBottom variant="title">
                { workflow.name }
              </Typography>
              <div>
                <IconButton
                  aria-label="More"
                  aria-owns={open ? 'long-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      width: 120,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  <EditCronModal schedule={schedule}
                    handleCloseCallback={this.handleClose}
                    trigger={
                    <MenuItem onClick={this.handleClose}>  { /* todo */ }
                      <EditOutlined className='menu-option-icon' />
                      Edit
                    </MenuItem>
                  } />
                  <MenuItem onClick={this._handleClose(onClickDelete(schedule.id))}>
                    <DeleteOutlined className='menu-option-icon' />
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <Divider />
            <Grid className='card-metadata' container spacing={8} >
              <Grid item xs={12} >
                Schedule: {schedule.cron}
              </Grid>
              <Grid item xs={12} >
                Scheduler ID: {schedule.id}
              </Grid>
              <Grid item xs={12} >
                Workflow ID: {schedule.workflowId}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

ScheduleCard.defaultProps = {
  schedule: {},
  workflows: [],
}

export default ScheduleCard;

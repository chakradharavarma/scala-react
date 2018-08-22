import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PlayArrowOutlined from '@material-ui/icons/PlayArrowOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { deleteWorkflow, runWorkflow } from '../../actions/workflowActions'
import { connect } from 'react-redux';

class AvailableWorkflows extends Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (beforeClosing) => () => {
    beforeClosing();
    this.setState({ anchorEl: null });
  };


  render() {
    const { onClickDelete, onClickRun } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <Grid container spacing={16} className='section sibling-fade' >
        {
          this.props.workflows
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((workflow, i) =>
              <Grid key={`workflow-template-${i}`} item xs={12} md={6} lg={4} xl={3} >
                <Card >
                  <CardContent>
                    <div className='workflow-title-container'>
                      <Typography color='secondary' gutterBottom variant="title">
                        {workflow.name}
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
                          onClose={this.handleClose(()=>null)}
                          PaperProps={{
                            style: {
                              width: 120,
                              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                            }
                          }}
                        >
                          <MenuItem onClick={this.handleClose(onClickRun(workflow.id))}>
                            <PlayArrowOutlined className='menu-option-icon' />
                            Run
                        </MenuItem>
                          <MenuItem onClick={this.handleClose(onClickRun(workflow.id))}>
                            <EditOutlined className='menu-option-icon' />
                            Edit
                        </MenuItem>
                          <MenuItem onClick={this.handleClose(onClickDelete(workflow.id))}>
                            <DeleteOutlined className='menu-option-icon' />
                            Delete
                        </MenuItem>
                        </Menu>
                      </div>
                    </div>
                    <Divider />

                    <Grid className='card-metadata' container spacing={0} >
                      <Grid item xs={4} >
                        {`v${workflow.version}`}
                      </Grid>
                      <Grid item xs={4} >
                        {`${workflow.resources.nodes} nodes`}
                      </Grid>
                      <Grid item xs={4} >
                        {workflow.resources.compute}
                      </Grid>
                    </Grid>
                    <Grid className='card-metadata' container spacing={8} >
                      <Grid item xs={6} >
                        {`STATUS: ${workflow.status}`}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )
        }
      </Grid>
    );
  }
}

AvailableWorkflows.defaultProps = {
  workflows: [],
}


AvailableWorkflows.propTypes = {
  workflows: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickRun: (id) => () => dispatch(runWorkflow(id)),
    onClickDelete: (id) => () => dispatch(deleteWorkflow(id)),
  }
};

export default connect(undefined, mapDispatchToProps)(AvailableWorkflows);

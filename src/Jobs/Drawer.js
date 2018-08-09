import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NewJobModal from './NewJobModal';
import { topSection, bottomSection } from './tileData';

const styles = {
  list: {
    width: 400,
  },
  fullList: {
    width: 'auto',
  },
};

class JobsDrawer extends Component {

  state = {
    open: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      open,
    });
  };

  render() {
    const { classes } = this.props;


    return (
      <div>
        <Button color='secondary' onClick={this.toggleDrawer(true)}>{this.props.title}</Button>
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)} style={{ width: '90%' }} >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <div className={classes.list}>
              <List>
                <ListItem button>
                  <NewJobModal />
                  <ListItemText primary="Create a New Job" />
                </ListItem>
              </List>
              <Divider />
              <List>{bottomSection}</List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

JobsDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobsDrawer);
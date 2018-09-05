import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ViewSwiper from './ViewSwiper';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class NewCronDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {

    return (
      <div>
        { 
          React.cloneElement(this.props.trigger, { onClick: this.toggleDrawer('top', true) })
        }
        <Drawer
          variant='temporary'
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer('top', false)}>
            <ViewSwiper/>
        </Drawer>
      </div>
    );
  }
}

NewCronDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewCronDrawer);

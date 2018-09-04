import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentLoader, { Facebook } from 'react-content-loader'

const classes = {
    modal: {
        content: 'create-new-schedule-expander',
        root: 'create-new-schedule-root',
    }
}

class LoadingCard extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button color='secondary' onClick={this.toggleDrawer('top', true)}>Add a new schedule</Button>
        <Drawer
          variant='persistent'
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer('top', false)}>
            <ViewSwiper/>
        </Drawer>
      </div>
    );
  }
}

LoadingCard.propTypes = {
    animate: PropTypes.bool,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    preserveAspectRatio: PropTypes.number,
};

export default Loading
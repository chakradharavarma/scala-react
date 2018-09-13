
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    width: '35vw',
    padding: 24,
  },
  cronExample: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  },
  boldType: {
    fontWeight: 800,
    textShadow: '.2px 0 #888888'

  }
});

class MouseOverPopover extends Component {
  state = {
    anchorEl: null,
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <InfoIcon
          className='cron-info-icon'
          aria-owns={open ? 'mouse-over-popover' : null}
          aria-haspopup="true"
          onMouseEnter={this.handlePopoverOpen}
          onMouseLeave={this.handlePopoverClose}
        />
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography variant='subheading' color='secondary' style={{ textTransform: 'uppercase', textAlign: 'center' }} gutterBottom>
            Examples
          </Typography>
          <div className={classes.cronExample}>
            <Typography>
              Run at 10:00am (UTC) everyday
          </Typography>
          <Typography className={classes.boldType}>
              0 10 * * ? *
          </Typography>
          </div>
          <div className={classes.cronExample}>
            <Typography>
              Run at 12:15pm (UTC) everyday
          </Typography>
          <Typography className={classes.boldType}>
              15 12 * * ? *
          </Typography>
          </div>
          <div className={classes.cronExample}>
            <Typography>
              Run at 6:00pm (UTC) every Mon-Fri
          </Typography>
          <Typography className={classes.boldType}>
              0 18 ? * MON-FRI *
          </Typography>
          </div>
          <div className={classes.cronExample}>
            <Typography>
              Run at 8:00am (UTC) every first day of the month
            </Typography>
            <Typography className={classes.boldType}>
              0 8 1 * ? *
          </Typography>
          </div>
          <div className={classes.cronExample}>
            <Typography>
              Run every 10 min Mon-Fri
            </Typography>
            <Typography className={classes.boldType}>
              0/10 * ? * MON-FRI *
            </Typography>
          </div>
          <div className={classes.cronExample}>
            <Typography>
              Run every 5 min Mon-Fri 8:00am-5:55pm (UTC)
          </Typography>
            <Typography className={classes.boldType}>
              0/5 8-17 ? * MON-FRI *
          </Typography>
          </div>
          <div className={classes.cronExample}>
            <Typography>
              Run at 9am (UTC) the first Monday of each month
            </Typography>
            <Typography className={classes.boldType}>
              0 9 ? * 2#1 *
            </Typography>
          </div>
        </Popover>
      </Fragment>
    );
  }
}

MouseOverPopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MouseOverPopover);

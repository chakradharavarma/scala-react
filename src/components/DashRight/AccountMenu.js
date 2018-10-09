import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AccountMenu extends React.Component {

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorElement.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { user } = this.props;

    return (
        <div className='dash-right-options'>
          <Button
            buttonRef={node => {
              this.anchorElement = node;
            }}
            onClick={this.handleToggle}
          >
            Hi, { this.props.username }
            <FontAwesomeIcon className='dash-icon' icon={faChevronDown} />
          </Button>
          <Popper open={open} anchorEl={this.anchorElement} transition style={{zIndex: 1}}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                      <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </MenuList>
                    <MenuList>
                      <MenuItem onClick={this.handleClose}>My Account</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
    );
  }
}

AccountMenu.propTypes = {
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return (
    {
      user: state.user,
    }
  )
};

export default connect(mapStateToProps)(AccountMenu);
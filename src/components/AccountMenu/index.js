import React from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logOut } from '../../actions/userActions';

class AccountMenu extends React.Component {

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = e => {
    if (this.anchorElement.contains(e.target)) {
      return;
    }
    this.setState({ open: false });
  };

  handleLogout = e => {
    this.props.handleLogout()
    this.handleClose(e)
  }

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
            Hi, { user.data.username }
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
                      <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                      <MenuItem disabled onClick={this.handleClose}>My Account</MenuItem>
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

const mapStateToProps = state => {
  return (
    {
      user: state.user,
    }
  )
};

const mapDispatchToProps = dispatch => {
  return (
    {
      handleLogout: () => dispatch(logOut())
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);
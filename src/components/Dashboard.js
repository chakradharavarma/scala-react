import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import classnames from 'classnames';
import DashLeft from './DashLeft';
import DashRight from './DashRight';

import { initializeApp } from '../actions/generalActions'
import { ConnectedRouter } from 'connected-react-router'
const history = createBrowserHistory()

const theme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      active: {
        color: '#5e8dbf !important'
      },
      completed: {
        color: '#5e8dbf !important'
      }
    },
    MuiList: {
      // see https://github.com/mui-org/material-ui/issues/9826
      root: {
        maxHeight: '50vh'
      }
    },
    MuiFormControlLabel: {
      root: {
        marginLeft: 0,
      },
    },
    MuiInput: {
      input: {
        letterSpacing: 2,
      },
      underline: {
        '&:before': {
          borderBottom: '1px solid #5e8dbf',// when input is not touched
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid #5e8dbf`,
        },
        '&$focused:after': {
          borderBottomColor: `#5e8dbf`,
        },
      },
    }
  },
  palette: {
    secondary: {
      main: '#5e8dbf',
    },
    tertiary: {
      main: '#5a5a5a',
    },
    quartinary: {
      main: '#0092cc',
    },
    error: {
      main: '#5a5a5a',
    },
    success: {
      main: '#4BB543',
    },
  },
});

class Dashboard extends Component {

  componentDidMount() {
    this.props.initialize()
  }

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <ConnectedRouter history={history}>
            <div className={classnames("dashboard-root")} >
              <DashLeft />
              <DashRight />
            </div>
          </ConnectedRouter>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initialize: () => dispatch(initializeApp())
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);


import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import classnames from 'classnames';
import blue from '@material-ui/core/colors/blue';
import DashLeft from './DashLeft';
import DashRight from './DashRight';
import './index.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
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

export default class Dashboard extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>        
          <div className={classnames("dashboard-root")} >
            <DashLeft />
            <DashRight username='bob' />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}
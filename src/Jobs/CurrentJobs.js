import React, { Component } from 'react';
import classnames from 'classnames';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TipCard from './TipCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '@material-ui/core/Icon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const classes = {
  paper: {
    root: 'quick-tips'
  }
}

export default class CurrentJobs extends Component {

  render() {
    return (
      <Card classes={classes.paper} >
        <div className={classnames('tips-header')}>
          <Typography variant='headline' color='secondary' className={classnames('tips-title')}>
            Current Jobs
          </Typography>
          <span className={classnames('tips-close-btn')}>
            <FontAwesomeIcon color="#696969" icon={faTimes} />
          </span>
        </div>


      </Card>
    )
  }

}
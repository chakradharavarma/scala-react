import React, { Component } from 'react';
import classnames from 'classnames';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TipCard from './TipCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '@material-ui/core/Icon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';

const classes = {
  paper: {
    root: 'quick-tips'
  }
}

export default class QuickTips extends Component {

  render() {
    return (
      <Card classes={classes.paper} >
        <div className={classnames('tips-header')}>
          <Typography variant='headline' color='secondary' className={classnames('tips-title')}>
            Quick Tips
          </Typography>
          <span className={classnames('tips-close-btn')}>
            <FontAwesomeIcon color="#696969" icon={faTimes} />
          </span>
        </div>
        <TipCard
          title='Build Your Software Library'
          subtitle='You will need to complete this step before using custom software with your job.'
          action='Add Software Now'
        />
        <TipCard
          title='Run Your First Job'
          subtitle='Software ready to go? Configure your first job to begin processing data'
          action='Run a Job Now'
        />

      </Card>
    )
  }

}
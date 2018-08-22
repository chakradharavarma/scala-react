import React, { Component } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Card from "@material-ui/core/Card";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";

import TipCard from './TipCard';

const classes = {
  card: {
    root: 'quick-tips'
  }
}

export default class QuickTips extends Component {

  state = {
    visible: !localStorage.getItem('quick-tips-modal-hidden')
  }


  hideQuickTips = () => {
    this.setState({ visible: false });
    localStorage.setItem('quick-tips-modal-hidden', true);
  }

  render() {
    const { visible } = this.state;
    localStorage.removeItem('quick-tips-modal-hidden');

    return (
      <Collapse in={visible}>
        <Card elevation={8} classes={classes.card} >
          <div className={classnames('tips-header')}>
            <Typography variant='headline' color='secondary' className={classnames('tips-title')}>
              Quick Tips
            </Typography>
            <span className={classnames('tips-close-btn')} onClick={this.hideQuickTips}>
              <FontAwesomeIcon color="#696969" icon={faTimes} />
            </span>
          </div>
          <TipCard
            title='Build Your Workflow Library'
            subtitle='You will need to complete this step before using custom software with your job.'
            action='Add Software Now'
          />
          <TipCard
            title='Run Your First Workflow'
            subtitle='Software ready to go? Configure your first job to begin processing data'
            action='Create a workflow now'
            drawer
          />

        </Card>
      </Collapse>

    )
  }

}
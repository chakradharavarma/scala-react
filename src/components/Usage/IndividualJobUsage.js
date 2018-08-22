import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class IndividualJobUsage extends Component {

  render() {
    return (
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='subheading' style={{ color: "#696969" }} >
            {this.props.data.uuid} : { this.props.data.status }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          fill this in with some actual data
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

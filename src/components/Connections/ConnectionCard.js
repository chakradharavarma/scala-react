import React, { Component } from 'react';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteConnectionModal from './DeleteConnectionModal';


class ConnectionCard extends Component {

  handleClick = () => {
    
  }

  render() {
    const { shell, handleClickDelete } = this.props;
    const instance = shell.Instances.find(instance => instance.InstanceId !== undefined);
    const instanceId = instance.InstanceId;
    const ip = instance.PublicIpAddress;
    const keyName = instance.KeyName;
    let state = instance.State.Name;

    const now = moment();
    const launchDate = moment(instance.LaunchTime);
    const duration = moment.duration(now.diff(launchDate));

    let connectionString = 'none';
    if (state === "running" && duration.asMinutes() > 4) {
      connectionString = "ssh -i " + keyName + ".pem ubuntu@" + ip;
    } else if (state === "running") {
      state = "pending";
    }
    return (
      <Grid item xs={4}>
        <Card className='connection-card' >
          <Grid container>
            <Grid item xs={12} className='menu-options-container'>
              {
                state !== 'shutting-down' &&
                <DeleteConnectionModal handleClickDelete={handleClickDelete(instanceId)}/>
              }
            </Grid>
            <Grid item xs={12} className='card-metadata'>
                <span style={{fontWeight: 800, textTransform: 'uppercase'}}>Instance: </span>
                {instanceId}
            </Grid>
            <Grid item xs={12} className='card-metadata'>
                <span style={{fontWeight: 800, textTransform: 'uppercase'}}>State: </span>
                {state}
            </Grid>
            <Grid item xs={12} className='card-metadata'>
                <span style={{fontWeight: 800, textTransform: 'uppercase'}}>
                  Connection String: 
                </span>
                <CopyToClipboard text={connectionString}>
                  <Tooltip disableHoverListener title="Copied!">
                    <span className='connection-string' >
                      {connectionString}
                    </span>
                  </Tooltip>
                </CopyToClipboard>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default ConnectionCard;
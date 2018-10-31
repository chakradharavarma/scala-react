import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteConnectionModal from './DeleteConnectionModal';

class ConnectionCard extends Component {

  state = {
    message: 'Click to copy'
  };

  handleCopyTextClick = () => {
    this.setState({ message: 'Copied!' })
  }

  handleCopyTextMouseOut = () => {
    const { message } = this.state;
    if (message !== 'Click to copy') {
      setTimeout(() => this.setState({ message: 'Click to copy' }), 700)  // TODO
    }
  }


  render() {
    const { shell, handleClickDelete } = this.props;
    const { instanceID, privateIP, state, keyPair } = shell;    
    const connectionString = `ssh -i ${keyPair}.pem ubuntu@${privateIP}`;

    return (
      <Grid item xs={4}>
        <Card className='connection-card' >
          <Grid container>
            <Grid item xs={12} className='menu-options-container'>
              {
                state !== 'shutting-down' &&
                <DeleteConnectionModal handleClickDelete={handleClickDelete(instanceID)} />
              }
            </Grid>
            <Grid item xs={12} className='card-metadata'>
              <span style={{ fontWeight: 800, textTransform: 'uppercase' }}>Instance: </span>
              {instanceID}
            </Grid>
            <Grid item xs={12} className='card-metadata'>
              <span style={{ fontWeight: 800, textTransform: 'uppercase' }}>State: </span>
              {state}
            </Grid>
            <Grid item xs={12} className='card-metadata'>
              <span style={{ fontWeight: 800, textTransform: 'uppercase' }}>
                Connection String:
                </span>
                {
                  connectionString === 'none' ? (
                    <span style={{marginLeft: 4 }} >
                      {connectionString}
                    </span>
                  ) : (
                    <Tooltip title={this.state.message}  >
                      <CopyToClipboard text={connectionString}>
                        <div className='connection-string' onClick={this.handleCopyTextClick} onMouseOut={this.handleCopyTextMouseOut} >
                          {connectionString}
                        </div>
                      </CopyToClipboard>
                    </Tooltip>
                  )
                }
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default ConnectionCard;
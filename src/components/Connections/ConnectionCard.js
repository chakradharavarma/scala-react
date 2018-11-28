import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteConnectionModal from './DeleteConnectionModal';
import { getConnections } from "../../actions/connectionActions";
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

  async componentDidMount() {
    setInterval(this.getConnections, 2000);
  }

  getConnections = async () => {
    const { shell, getConnections } = this.props;
    if (!shell.state) {
      getConnections()
    }
  }


  render() {
    const { shell, handleClickDelete } = this.props;
    const { instanceID, publicIP, state, keyPair } = shell;
    const connectionString = keyPair && publicIP && `ssh -i ${keyPair} ubuntu@${publicIP}`;
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
              <span style={{ textTransform: 'capitalize' }}>{state || "Initializing"} </span>
              
            </Grid>
            <Grid item xs={12} className='card-metadata'>
              <span style={{ fontWeight: 800, textTransform: 'uppercase' }}>
                Connection String:
              </span>
              <Tooltip title={connectionString ? this.state.message : 'Please wait'}  >
                <CopyToClipboard text={connectionString}>
                  <div className='connection-string' onClick={this.handleCopyTextClick} onMouseOut={this.handleCopyTextMouseOut} >
                    {connectionString || '\u00A0'}
                  </div>
                </CopyToClipboard>
              </Tooltip>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getConnections: () => dispatch(getConnections())
  }
}


export default connect(null, mapDispatchToProps)(ConnectionCard);

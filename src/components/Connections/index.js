import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import AddIcon from '@material-ui/icons/Add';

import ScalaLoader from '../ScalaLoader';

import ConnectionCard from './ConnectionCard';
import { downloadKeyPair } from '../../actions/generalActions';
import { createConnection, deleteConnection } from '../../actions/connectionActions';

class Connections extends Component {

  render() {
    const { connections, downloadKeyPair, handleClickDelete, handleClickCreateConnection } = this.props;
    const { fetching, fetched, data } = connections;

    return (
      <Fragment>
        <div>
          <Button color='secondary' onClick={downloadKeyPair}>
            <ArrowDownward />
            <Typography color='secondary'>
              Download Key Pair
          </Typography>
          </Button>
          <Button color='secondary' onClick={handleClickCreateConnection}>
            <AddIcon />
            <Typography color='secondary'>
              Launch a shell session
          </Typography>
          </Button>
        </div>
        <Grid container spacing={16} className='connections-root'>
          <Grid item xs={12} >
            <Card elevation={8} className='desktop-section-container'>
              <Typography variant='headline' color='secondary'>
                Terminals
              </Typography>
              <Divider />
              {
                fetching ? (
                  <ScalaLoader centered active />
                ) :
                    <Grid container className='connection-cards-container sibling-fade'>
                      {
                        fetched && (
                          data.Reservations
                            .sort((a, b) => moment(a.Instances[0] - moment(b.Instances[0])))
                            .filter(shell => shell.Instances.find(instance => instance.InstanceId !== undefined).State.Name !== 'terminated')
                            .map((shell, i) =>
                              <ConnectionCard handleClickDelete={handleClickDelete} key={`connection-card-${i}`} shell={shell} />
                            )
                        )
                      }
                    </Grid>
              }
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    connections: state.connections
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    downloadKeyPair: () => dispatch(downloadKeyPair()),
    handleClickDelete: (id) => () => dispatch(deleteConnection(id)),
    handleClickCreateConnection: () => dispatch(createConnection())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
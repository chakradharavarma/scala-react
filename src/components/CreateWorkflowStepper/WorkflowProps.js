import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Dropzone from 'react-dropzone'
import {
  numberOfNodes,
  clusterType
} from '../TextField/fields';
import { change, formValueSelector } from 'redux-form';

class WorkflowProps extends Component {

  onFileLoad = (e, file) => alert(e.target.result, file.name);

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };


  state = {
    files: [],
  }

  handleDrop = (accepted, rejected) => { // todo add rejected code
    const { dropFailed, changeFiles, files } = this.props

    if (rejected.length) {
      dropFailed(rejected)
    }
    changeFiles(accepted.concat(files))

    this.setState({ acceptedFiles: accepted.concat(this.state.acceptedFiles) });
  }

  remove = (file) => () => {
    const { changeFiles, files } = this.props
    changeFiles(files.filter(f => f.name !== file.name))
  }

  render() {

    const { files } = this.props;
    
    return (
      <div className='step-content-container'>
        <Grid container style={{ margin: 20 }} justify='center'>
          <Grid container item xs={12} spacing={32}>
            <Grid item xs={12}>
              <Field name="resources.compute" component={clusterType} />
            </Grid>
            <Grid item xs={12} >
              <Field name="resources.instanceCount"
                parse={val => isNaN(parseInt(val, 10)) ? null : parseInt(val, 10)}
                type='number'
                component={numberOfNodes}
              />
            </Grid>
            <Grid item xs={12}>
              <Dropzone style={{ flex: 1, border: 'unset' }} onDrop={this.handleDrop} >
                {({ isDragActive }) => (
                  <Button
                    disableRipple
                    variant='outlined'
                    style={{ width: '100%', height: '50%', border: '1px solid #5e8dbf', backgroundColor: isDragActive ? '#78A7D9' : '#5e8dbf', color: 'white' }}
                  >
                    Add or Drop Files
                  </Button>
                )
                }
              </Dropzone>
              <div className='pending-uploads-container'>
                {
                  files.map((file, i) => {
                    return (
                      <Tooltip title="Click to remove" placement='right-start' >             
                        <Typography className='pending-upload-file' onClick={this.remove(file)} key={`file-${i}`}>{file.name}</Typography>
                      </Tooltip>
                    )
                  })
                }
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const selector = formValueSelector('createWorkflow');

const mapStateToProps = (state) => {
  return {
    files: selector(state, 'files'),
  }
}


const mapDispatchToProps = dispatch => {
  return {
    changeFiles: files => dispatch(change('createWorkflow', 'files', files))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'createWorkflow',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
  })(WorkflowProps)
);
import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import FileExplorer from './FileExplorer';

export default class Files extends Component {

  constructor(props) {
    super(props);
    this.state = {
      path: this.props.path,
    }
  }
  
  onPathChange = (path) =>{
    this.setState({ path: path.target.value })
  }

  render() {
    return (
      <Card className='file-explorer'>
        <FileExplorer />
      </Card>
   );
  }
}


Files.defaultProps = {
  path: '/usr/bin/bash'
};
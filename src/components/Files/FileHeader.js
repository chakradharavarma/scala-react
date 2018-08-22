import React, { Component } from 'react';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default class FileHeader extends Component {

  render() {
    return (
      <Card className='card-file-header'>
        <div className='card-file-header-title'>
          Root
          <span className='card-file-header-path'>
            /
          </span>
        </div>
        <div className='card-file-header-interactions'>
          <span className='card-file-header-actions'>
            <span className='card-file-header-action'>
              <FontAwesomeIcon className='card-icon' icon={faPlusCircle} />
              New Directory
            </span>
            <span className='card-file-header-action'>
              <FontAwesomeIcon className='card-icon' icon={faUpload} />
              Upload
          </span>
          </span>
          <span className='card-file-header-search-container'>
            <input onChange={this.props.onSearchChange} className='card-file-header-search' type='search' placeholder='SEARCH...' />
          </span>
        </div>
      </Card>
    );
  }
}

FileHeader.defaultProps = {

}
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { initialize } from 'redux-form';
import urljoin from 'url-join';
import { ContextMenu, Item, ContextMenuProvider } from 'react-contexify';
import { fetchFolder, fetchFile, downloadFile, deleteFile } from '../../actions/fileActions';
import ConfirmActionModal from '../ConfirmActionModal';
import 'react-contexify/dist/ReactContexify.min.css';

class FileExplorerRow extends Component {

  confirmActionModalTrigger = React.createRef();

  state = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    nameModal: false,
    renameModal: false,
  };

  deleteFile = () => {
    this.confirmActionModalTrigger.current.click();
  };

  showRenameModal = (name) => () => {
    const { initialize, toggleRenameModal } = this.props;
    this.setState(prevState => {
      if (!prevState.renameModal) {
        initialize(name);
        toggleRenameModal(true);
      }
    })
  };

  formatSize = (size, percision) => { 
    if (0 === size) return "0 B";
    if (-1 === size) return "unknown"
    const base = 1024;
    const types = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const idx = Math.floor(Math.log(size) / Math.log(base));
    return parseFloat((size / Math.pow(base, idx)).toFixed(percision || 0)) + " " + types[idx] 
  }


  render() {
    const { row, i, folder, fetchFile, fetchFolder, deleteFile, downloadFile } = this.props;

    const RightClickMenu = (props) => {
      return (
        <Fragment>
          <ContextMenu animation='fade' id={props.id} >
            <Item onClick={this.showRenameModal(props.data.name).bind(this)}>
              <Typography>
                Rename
              </Typography>
            </Item>
            <Item onClick={downloadFile}>
              <Typography>
                Download
                </Typography>
            </Item>
            <Item onClick={this.deleteFile}>
              <Typography>
                Delete
              </Typography>
            </Item>
          </ContextMenu>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <ConfirmActionModal
          message='Are you sure you want to delete this file?'
          handleConfirm={deleteFile({ ...row, path: urljoin(folder.path, row.name) })}
        ><tr className='file-explorer-confirm-delete-menu-handler' ref={this.confirmActionModalTrigger} />
        </ConfirmActionModal>

        <ContextMenuProvider className='flex' component={TableRow} data={{ file: { ...row, path: `${folder.path.trimRight('/')}/${row.name}` } }} id={`row-${i}`}>
          <TableCell className='flex'>
            <Typography
              color={row.isdir ? 'secondary' : 'default'}
              className='file-explorer-item'
              onClick={row.isdir ?
                fetchFolder(urljoin(folder.path, row.name)) :
                fetchFile(urljoin(folder.path, row.name))
              }
            >
              {row.name}
            </Typography>
          </TableCell>
          <TableCell className='flex'>
            {row.isdir ? 'Directory' : 'File'}
          </TableCell>
          <TableCell className='flex'>
            {row.modified.toLocaleString()}
          </TableCell>
          <TableCell className='flex'>
            { this.formatSize(row.size)}
          </TableCell>
        </ContextMenuProvider>
        <RightClickMenu data={{ path: `${folder.path.trimRight('/')}/${row.name}`, name: row.name }} id={`row-${i}`} />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFolder: (path) => () => dispatch(fetchFolder(path)),
    fetchFile: (path) => () => dispatch(fetchFile(path)),
    downloadFile: ({ event, ref, data, dataFromProvider }) => dispatch(downloadFile(dataFromProvider.file.path)),
    deleteFile: (data) => () => dispatch(deleteFile(data)), // todo
    initialize: (name) => dispatch(initialize('renameFile', {
      oldName: name,
      newName: name,
    })),
  }
}

const mapStateToProps = (state) => {
  return {
    folder: state.folder,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorerRow);
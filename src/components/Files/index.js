import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames'
import FileModal from './FileModal';
import NameModal from './NameModal';
import ScalaLoader from '../ScalaLoader';
import UploadFileModal from './UploadFileModal';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableCell from "@material-ui/core/TableCell";
import AddIcon from "@material-ui/icons/Add";
import Button from '@material-ui/core/Button';
import UploadIcon from "@material-ui/icons/CloudUpload";
import Fade from '@material-ui/core/Fade';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { searchField } from '../TextField/fields';
import urljoin from 'url-join';
import { ContextMenu, Item, ContextMenuProvider } from 'react-contexify';
import { fetchFolder, fetchFile, downloadFile, deleteFile } from '../../actions/fileActions';


import 'react-contexify/dist/ReactContexify.min.css';

const formatModifiedDate = (modifiedDate) => new Date(modifiedDate * 1000).toLocaleString();


const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'isdir', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'modified', numeric: false, disablePadding: false, label: 'Modified' },
  { id: 'size', numeric: true, disablePadding: false, label: 'Size' },
];


function getSorting(order, orderBy) {

  return (a, b) => {
    let _a = a[orderBy];
    let _b = b[orderBy];

    if (_a === _b) {
      return 0;
    }
    else if (typeof _a === 'string') {
      return order === 'desc' ? _a.localeCompare(_b) : _b.localeCompare(_a);
    } else {
      return order === 'desc' ? (_a > _b ? 1 : -1) : (_b > _a ? 1 : -1);
    }
  }
}


class Files extends Component {

  componentDidMount() {
    window.addEventListener("hashchange", this.onHashChange, false);
    const { fetchFolder, folder, modal } = this.props;
    const hash = window.location.hash;
    if(!modal) {
      if(hash) {
        fetchFolder(hash.substring(1))()
      } else {
        fetchFolder('/')();
      }
    }
    else if (folder) { // only for modals
      fetchFolder(folder.path)();
    } else {
      // this is bad news? // todo
    }
  }

  componentWillUnmount() { 
    window.removeEventListener("hashchange", this.onHashChange, false);
  }

  onHashChange = () => {
    const { fetchFolder, modal } = this.props;
    const hash = window.location.hash;
    if(!modal && hash) {
      fetchFolder(hash.substring(1))()
    }
  }

  state = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    nameModal: false,
    renameModal: false,
  }
  createSortHandler = property => event => {
    this.onRequestSort(event, property);
  };


  onRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  toggleNameModal = () => {
    this.setState(prevState => {
      return { nameModal: !prevState.nameModal }
    })
  }

  toggleRenameModal = () => {
    this.setState(prevState => {
      return { renameModal: !prevState.renameModal }
    })
  }

  downloadFile = ({ event, ref, data, dataFromProvider }) => {
    let form = document.getElementById('download-file-form');
    if (form) { // avoid appending multiple forms
      document.body.remove(form);
    }
    form = document.createElement('form');
    form.action = '/downloadFromMount/'
    form.method = 'POST'
    form.style = 'display: hidden;';
    form.id = 'download-file-form';
    let input = document.createElement('input');
    input.name = 'filesToDownload'
    input.value = dataFromProvider.file.path;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  }

  render() {
    const { fetchFile, fetchFolder, folder, deleteFile, modal, filter } = this.props;
    const { orderBy, order, nameModal, renameModal } = this.state;
    let { data, path, fetching } = folder;
    data = data || [];
    if (!folder) {
      return null;
    }

    const uploadFileTrigger = (
      <Button color='secondary'>
        <UploadIcon className='button-icon' color='secondary' />
        Upload
      </Button>
    )

    const MyAwesomeMenu = (props) => {
      debugger;
      console.log(props)
      return (
      <Fragment>
      <ContextMenu animation='fade' id={props.id} >
        <Item onClick={this.toggleRenameModal}>
          <Typography>
            Rename
          </Typography>
        </Item>

        <Item onClick={this.downloadFile}>
          <Typography>
            Download
            </Typography>
        </Item>
        <Item onClick={deleteFile}>
          <Typography>
            Delete
            </Typography>
        </Item>
      </ContextMenu>
      </Fragment>
    )
  };

    let parts = path.split('/')
    if(modal) {
      parts.splice(1,2)
    }
    return (
      <Fragment>
        <NameModal type='rename' open={renameModal} onClose={this.toggleRenameModal} />
        <NameModal type='dir' open={nameModal} onClose={this.toggleNameModal} />
        <Card className='file-explorer' elevation={modal ? 0 : 4}>
          <div className={classnames({ 'card-file-header': !modal })} >
            <div className='card-file-header-interactions'>
              <span className='card-file-header-actions'>
                <Button color='secondary' onClick={this.toggleNameModal} >
                  <AddIcon className='button-icon' />
                  New Directory
                </Button>
                <UploadFileModal trigger={uploadFileTrigger} />
              </span>
              <span className='card-file-header-search-container'>
                <Field name='filter' component={searchField} />
              </span>
            </div>
            <div className='card-file-header-title'>
              {
                parts
                  .map((part, i) => (
                    <span key={`file-path-${i}`}
                      className='card-file-header-path'
                      onClick={fetchFolder(path.split('/').slice(0, i + (modal ? 3 : 1)).join('/') || '/')} >
                      {(i !== 1 ) ? '/' : ''} {part}
                    </span>
                  ))
              }
            </div>

          </div>
          {
            fetching ? (
              <ScalaLoader centered active />
            ) : (
                <Fade in timeout={400}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {columnData.map(column => {
                          return (
                            <TableCell
                              key={column.id}
                              numeric={column.numeric}
                              padding={column.disablePadding ? 'none' : 'default'}
                              sortDirection={orderBy === column.id ? order : false}
                            >
                              <Tooltip
                                title="Sort"
                                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                enterDelay={300}
                              >
                                <TableSortLabel
                                  active={orderBy === column.id}
                                  direction={order}
                                  onClick={this.createSortHandler(column.id)}
                                >
                                  {column.label}
                                </TableSortLabel>
                              </Tooltip>
                            </TableCell>
                          );
                        }, this)}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data
                        .filter(row => row.name.toLowerCase().includes((filter || '').toLowerCase()))
                        .sort(getSorting(order, orderBy))
                        .map((row, i) => (
                          <Fragment key={`file-row-${i}`}>
                            <ContextMenuProvider component={TableRow} data={{ file: { ...row, path: `${folder.path.trimRight('/')}/${row.name}` } }} id={`row-${i}`}>
                              <TableCell>
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
                              <TableCell>
                                {row.isdir ? 'Directory' : 'File'}
                              </TableCell>
                              <TableCell>
                                {formatModifiedDate(row.modified)}
                              </TableCell>
                              <TableCell numeric>
                                {row.size} bytes
                        </TableCell>
                            </ContextMenuProvider>
                            <MyAwesomeMenu data={{ path: `${folder.path.trimRight('/')}/${row.name}` }} id={`row-${i}`} />
                          </Fragment>
                        )
                        )}
                    </TableBody>
                  </Table>

                </Fade>
              )

          }
        </Card>
        <FileModal />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFolder: (path) => () => dispatch(fetchFolder(path)),
    fetchFile: (path) => () => dispatch(fetchFile(path)),
    downloadFile: ({ event, ref, data, dataFromProvider }) => dispatch(downloadFile(dataFromProvider.file.path)),
    deleteFile: ({ event, ref, data, dataFromProvider }) => {
      dispatch(deleteFile(dataFromProvider)) // todo
    },

  }
}

const selector = formValueSelector('filesFilter');

const mapStateToProps = (state) => {
  return {
    folder: state.folder,
    filter: selector(state, 'filter')
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'filesFilter',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
  })(Files)
);
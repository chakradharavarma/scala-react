import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames'
import FileModal from './FileModal';
import NameModal from './NameModal';
import ScalaLoader from '../ScalaLoader';
import UploadFileModal from './UploadFileModal';
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
import { fetchFolder, fetchFile } from '../../actions/fileActions';
import FileExplorerRow from './FileExplorerRow';
import 'react-contexify/dist/ReactContexify.min.css';

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
    // Add the hash if it doesn't exist and fetch the folder
    const { fetchFolder, folder, history } = this.props;
    const hash = history.location.hash;
    const path = hash ? hash.substring(1) : folder.path
    fetchFolder(path)();
    this.unlisten = history.listen(this.onHashChange);

  }


  componentWillUnmount() {
    // Remove the hash and stop listening
    //const { history } = this.props;
    this.unlisten()
    //history.replace(history.location.pathname)
  }

  onHashChange = (location, _) => {
    const { fetchFolder, modal } = this.props;
    const hash = location.hash;
    if (!modal && hash) {
      fetchFolder(decodeURI(hash.substring(1)))()
    }
  }

  state = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
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

  render() {
    const { fetchFolder, folder, modal, filter } = this.props;
    const { orderBy, order, nameModal, renameModal } = this.state;
    let { data, path, fetching, fetched } = folder;

    data = data || [];

    const uploadFileTrigger = (
      <Button color='secondary'>
        <UploadIcon className='button-icon' color='secondary' />
        Upload
      </Button>
    )


    let parts = path.split('/')
    const tooBig = path.length > 75
    const cut = modal || tooBig
    console.log(path.length);
    if (cut) {
      if (modal) parts.splice(1, 2)
      else if (tooBig) {
        parts.splice(1, 1)
        parts = ['..'].concat(parts)
      }
    }

    const rows = data
      .filter(row => row.name.toLowerCase().includes((filter || '').toLowerCase()))
      .sort(getSorting(order, orderBy))
      //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                      onClick={fetchFolder(path.split('/').slice(0, i + (cut ? 3 : 1)).join('/') || '/')} >
                      {(i !== 1) ? '/' : ''} {part}
                    </span>
                  ))
              }
            </div>

          </div>
          <ScalaLoader centered active={fetching}>
            {
              fetched ? 
                <Fade in timeout={400}>
                  <Table className="file-explorer-table flex">
                    <TableHead className='flex'>
                      <TableRow className='flex'>
                        {columnData.map(column => {
                          return (
                            <TableCell
                              className='flex'
                              key={column.id}
                              numeric={column.numeric}
                              padding={column.disablePadding ? 'none' : 'default'}
                              sortDirection={orderBy === column.id ? order : false}
                            >
                              <Tooltip
                                title="Sort"
                                disableFocusListener
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
                    <TableBody classes={{ root: 'file-explorer-table-body flex' }}>
                      {
                        rows
                          .map((row, i) =>
                            <FileExplorerRow
                              i={i}
                              toggleRenameModal={this.toggleRenameModal}
                              row={row}
                              key={`file-row-${i}`}
                            />
                          )
                      }
                    </TableBody>
                  </Table>
                </Fade>
                :
                <div classnames='centered'>Unable to get files</div>
            }
          </ScalaLoader>
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
  })(withRouter(Files))
);
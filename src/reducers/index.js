import { combineReducers } from '../../../../Library/Caches/typescript/2.9/node_modules/redux';
import UserReducer from './userReducer';
import AvailableWorkflowReducer from './availableWorkflowReducer';
import TemplateWorkflowReducer from './templateWorkflowReducer';
import ScheduleReducer from './scheduleReducer';
import JobsReducer from './jobsReducer';
import ConnectionsReducer from './connectionsReducer';
import DesktopsReducer from './desktopsReducer';
import SnackbarReducer from './snackbarReducer';
import FolderReducer from './folderReducer';
import FileReducer from './fileReducer';
import { reducer as FormReducer } from 'redux-form'

const reducers = combineReducers({
	user:					UserReducer,
	availableWorkflows:		AvailableWorkflowReducer,
	jobs:					JobsReducer,
	schedules:				ScheduleReducer,
	templateWorkflows:		TemplateWorkflowReducer,
	form:					FormReducer,
	connections:			ConnectionsReducer,
	desktops:				DesktopsReducer,
	snackbar:				SnackbarReducer,
	file:					FileReducer,
	folder:					FolderReducer,
});

export default reducers;
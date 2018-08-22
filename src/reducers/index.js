import { combineReducers } from 'redux';

import UserReducer from './userReducer';
import AvailableWorkflowReducer from './availableWorkflowReducer';
import TemplateWorkflowReducer from './templateWorkflowReducer';
import ScheduleReducer from './scheduleReducer';
import JobsReducer from './jobsReducer';
import ConnectionsReducer from './connectionsReducer';
import DesktopsReducer from './desktopsReducer';
import { reducer as FormReducer } from 'redux-form'

const reducers = combineReducers({
	user:					UserReducer,
	availableWorkflows:		AvailableWorkflowReducer,
	jobs:					JobsReducer,
	schedules:				ScheduleReducer,
	templateWorkflows:		TemplateWorkflowReducer,
	form:					FormReducer,
	connections:			ConnectionsReducer,
	desktops:				DesktopsReducer
});

export default reducers;
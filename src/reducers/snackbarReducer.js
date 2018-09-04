import { createNotification } from '../common/helpers';

import * as actions from '../actions/types';

import {
  SUCCESS,
  INFO,
  ERROR,
} from '../common/consts';

const initialState = {
  open: false,
  queue: [],
  notification: undefined,
}

function processQueue(state, notification) {
  if(notification && (state.queue.length || state.notification)) {
    state.queue.push(notification);
    state = { ...state, open: true };
  } else if(notification) {
    state = { ...state, notification, open: true };
  } else if(!notification && state.queue.length) {
    notification = state.queue.shift();
    state = { ...state, notification, open: true }
  } else {
    state = { ...state, notification: undefined, open: false }
  }
  return state;
}

// TODO: If all actions have processqueue calls, put it at the end
export default function (state=initialState, action) {
  let notification;
  switch(action.type){
    case actions.PROCESS_QUEUE:
      state = processQueue(state);
      break;
    case actions.PUSH_MESSAGE: // todo delete pushmessage
      state = { ...state, queue: state.queue.push(action.payload)};
      break;
    case actions.CLOSE_SNACKBAR:
      state = { ...state, open: false};
      break;
    case actions.DOWNLOAD_KEY_PAIR_SUCCESS:
      notification = createNotification('Successfully download key pair', SUCCESS);
      state = processQueue(state, notification)
      break
    case actions.FETCHED_CONNECTIONS_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification)
      break;
    case actions.CREATE_CONNECTION:
      notification = createNotification('Creating a connection . . .', INFO);
      state = processQueue(state, notification);
      break;
    case actions.CREATE_CONNECTION_SUCCESS:
      notification = createNotification('Successfully created connection', SUCCESS)
      state = processQueue(state, notification)
      break;
    case actions.CREATE_CONNECTION_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification)
      break;
    case actions.DELETE_CONNECTION_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification)
      break;
    case actions.DELETE_CONNECTION_SUCCESS:
      notification = createNotification('Successfully started deleting connection', SUCCESS);
      state = processQueue(state, notification)
      break;
    case actions.DOWNLOAD_KEY_PAIR_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification)
      break;
    case actions.FETCHED_WORKFLOWS_AVAILABLE_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_WORKFLOW:
      notification = createNotification('Deleting workflow . . . ', INFO);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_WORKFLOW_SUCCESS:
      notification = createNotification('Successfully deleted workflow', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_WORKFLOW_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.FETCHED_DESKTOPS_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.CREATE_DESKTOP:
      notification = createNotification('Creating a new desktop . . .', INFO);
      state = processQueue(state, notification);
      break;
    case actions.CREATE_DESKTOP_SUCCESS:
      notification = createNotification('Successfully created desktop', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.CREATE_DESKTOP_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_DESKTOP_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_DESKTOP_SUCCESS:
      notification = createNotification('Successfully started deleting desktop', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_DESKTOP:
      notification = createNotification('Deleting desktop . . .', INFO);
      state = processQueue(state, notification);
      break;
    case actions.FETCHED_SCHEDULES_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_SCHEDULE: // todo delete
      notification = createNotification('Deleting schedule . . .', INFO);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_SCHEDULE_SUCCESS:
      notification = createNotification('Successfully deleted schedule', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.CREATE_SCHEDULE_SUCCESS:
      notification = createNotification('Successfully created schedule', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_SCHEDULE_FAILED:    
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.RUN_WORKFLOW_SUCCESS:    
      notification = createNotification('Successfully started job', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.RUN_WORKFLOW_FAILED:    
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.EDIT_SCHEDULE_SUCCESS:
      notification = createNotification('Successfully edited schedule', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.EDIT_SCHEDULE_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_CONNECTION:
      notification = createNotification('Deleting connection', INFO);
      state = processQueue(state, notification);
      break;
    case actions.CREATE_WORKFLOW_SUCCESS:
      notification = createNotification('Successfully created workflow', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.FETCHED_FOLDER_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.SAVE_FILE_SUCCESS:
      notification = createNotification('Successfully saved file', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.CREATE_WORKFLOW_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.CREATE_FOLDER_SUCCESS:
      notification = createNotification('Successfully created folder', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.CREATE_FOLDER_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.DOWNLOAD_FILE_SUCCESS:
      notification = createNotification('Successfully started download', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.DOWNLOAD_FILE_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.UPLOAD_FILES_SUCCESS:
      notification = createNotification('Successfully uploaded', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.UPLOAD_FILES_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.FETCHED_FILE_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_FILE_SUCCESS:
      notification = createNotification('Successfully deleted', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.DELETE_FILE_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    case actions.TERMINATE_JOB_SUCCESS:
      notification = createNotification('Successfully terminated job', SUCCESS);
      state = processQueue(state, notification);
      break;
    case actions.TERMINATE_JOB_FAILED:
      notification = createNotification(action.payload.message, ERROR);
      state = processQueue(state, notification);
      break;
    default:
      break;
  }
  return state
}
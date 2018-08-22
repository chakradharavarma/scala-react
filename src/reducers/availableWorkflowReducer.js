import {
  CLEAR_MESSAGES,
  DELETE_WORKFLOW,
  DELETE_WORKFLOW_FAILED,
  DELETE_WORKFLOW_SUCCESS,
  FETCHED_WORKFLOWS_AVAILABLE_FAILED,
  FETCHED_WORKFLOWS_AVAILABLE_SUCCESS,  
  INIT_APP,
} from '../actions/types';

import {
  ERROR,
  SUCCESS,
  INFO,
} from '../common/consts';

import { createNotification } from '../common/helpers';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  notification: undefined,
}

export default function (state={...initialState}, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true};
      break;
    case FETCHED_WORKFLOWS_AVAILABLE_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case FETCHED_WORKFLOWS_AVAILABLE_FAILED:
      state = { ...state, fetching: false, fetched: false, notification: createNotification(action.payload.message, ERROR)};
      break;
    case DELETE_WORKFLOW:
      state = { ...state, fetching: false, fetched: false, notification: createNotification('Deleting workflow . . . ', INFO)};
      break;
    case DELETE_WORKFLOW_SUCCESS:
      state = { ...state, fetching: false, fetched: false, notification: createNotification('Successfully deleted workflow', SUCCESS)};
      break;
    case DELETE_WORKFLOW_FAILED:
      state = { ...state, fetching: false, fetched: false, notification: createNotification(action.payload.message, ERROR)};
      break;
    case CLEAR_MESSAGES:
      state = { ...state, notification: undefined};
      break;
    default:
      break;
  }
  return state
}
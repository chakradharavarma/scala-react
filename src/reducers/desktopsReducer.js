import {
  INIT_APP,
  CLEAR_MESSAGES,
  CREATE_DESKTOP,
  CREATE_DESKTOP_SUCCESS,
  CREATE_DESKTOP_FAILED,
  DELETE_DESKTOP,
  DELETE_DESKTOP_SUCCESS,
  DELETE_DESKTOP_FAILED,
  FETCHED_DESKTOPS_FAILED,
  FETCHED_DESKTOPS_SUCCESS,
} from '../actions/types';

import {
  ERROR,
  INFO,
  SUCCESS,
} from '../common/consts';

import { createNotification } from '../common/helpers';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  notification: undefined,
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true, fetched: false};
      break;
    case FETCHED_DESKTOPS_SUCCESS:
      state = { ...state, fetching: false, fetched: false, data: action.payload.data};
      break;
    case FETCHED_DESKTOPS_FAILED:
      state = { ...state, fetching: false, notification: createNotification(action.payload.message, ERROR)};
      break;
    case CREATE_DESKTOP:
      state = { ...state, notification: createNotification('Creating a new desktop . . .', INFO)};
      break;
    case CREATE_DESKTOP_SUCCESS:
      state = { ...state, notification: createNotification('Successfully created desktop', SUCCESS)};
      break;
    case CREATE_DESKTOP_FAILED:
      state = { ...state, notification: createNotification(action.payload.message, ERROR)};
    break;
    case DELETE_DESKTOP_FAILED:
      state = { ...state, notification: createNotification(action.payload.message, ERROR)};
      break;
    case DELETE_DESKTOP_SUCCESS:
      state = { ...state, notification: createNotification('Successfully deleted desktop', SUCCESS)};
      break;
    case DELETE_DESKTOP:
      state = { ...state, notification: createNotification('Deleting desktop . . .', INFO)};
      break;
    case CLEAR_MESSAGES:
      state = { ...state, notification: undefined};
      break;
    default:
      break;
  }
  return state
}
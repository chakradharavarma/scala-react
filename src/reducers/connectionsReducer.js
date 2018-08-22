import {
  INIT_APP,
  CLEAR_MESSAGES,
  CREATE_CONNECTION,
  CREATE_CONNECTION_SUCCESS,
  CREATE_CONNECTION_FAILED,
  DELETE_CONNECTION_SUCCESS,
  DELETE_CONNECTION_FAILED,
  DOWNLOAD_KEY_PAIR_SUCCESS,
  DOWNLOAD_KEY_PAIR_FAILED,
  FETCHED_CONNECTIONS_SUCCESS,
  FETCHED_CONNECTIONS_FAILED,
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
  data: {},
  notification: undefined,
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true, fetched: false};
      break;
      case FETCHED_CONNECTIONS_FAILED:
      state = { ...state, fetching: false, fetched: false, notification: createNotification(action.payload.message, ERROR)};
      break;
    case FETCHED_CONNECTIONS_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case CREATE_CONNECTION:
      state = { ...state, notification: createNotification('Creating a connection . . .', INFO)};
      break;
    case CREATE_CONNECTION_SUCCESS:
      state = { ...state, notification: createNotification('Successfully created connection', SUCCESS)};
      break;
    case CREATE_CONNECTION_FAILED:
      state = { ...state, notification: createNotification(action.payload.message, ERROR)};
      break;
    case DELETE_CONNECTION_FAILED:
      state = { ...state, notification: createNotification(action.payload.message, ERROR)};
      break;
    case DELETE_CONNECTION_SUCCESS:
      state = { ...state, notification: createNotification('Successfully deleted connection', SUCCESS)};
      break;
    case DOWNLOAD_KEY_PAIR_FAILED:
      state = { ...state, notification: createNotification(action.payload.message, ERROR)};
      break;
    case DOWNLOAD_KEY_PAIR_SUCCESS:
      state = { ...state, notification: createNotification('Successfully download key pair', SUCCESS)}
      break
    case CLEAR_MESSAGES:
      state = { ...state, notification: undefined};
      break;
    default:
      break;
  }
  return state
}
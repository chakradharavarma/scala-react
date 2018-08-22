import {
  INIT_APP,
  CLEAR_MESSAGES,
  DELETE_SCHEDULE,
  DELETE_SCHEDULE_FAILED,
  DELETE_SCHEDULE_SUCCESS,
  FETCHED_SCHEDULES_FAILED,
  FETCHED_SCHEDULES_SUCCESS,
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
      state = { ...state, fetching: true};
      break;
      case FETCHED_SCHEDULES_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case FETCHED_SCHEDULES_FAILED:
      state = { ...state, fetching: false, fetched: false, notification: createNotification(action.payload.message, ERROR)};
      break;
    case DELETE_SCHEDULE:
      state = { ...state, notification: createNotification('Deleting schedule . . .', INFO)};
      break;
    case DELETE_SCHEDULE_SUCCESS:
      state = { ...state, notification: createNotification('Successfully deleted schedule', SUCCESS)};
      break;
    case DELETE_SCHEDULE_FAILED:    
      state = { ...state, notification: createNotification(action.payload.message, ERROR)};
      break;
    case CLEAR_MESSAGES:    
      state = { ...state, notification: undefined};
      break;
    default:
      break;
  }
  return state
}
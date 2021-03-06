import {
  INIT_APP,
  LOG_OUT,
  FETCHED_SCHEDULES_FAILED,
  FETCHED_SCHEDULES_SUCCESS,
  CREATE_SCHEDULE_FAILED,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  err: null,
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true};
      break;
      case FETCHED_SCHEDULES_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data || []};
      break;
    case FETCHED_SCHEDULES_FAILED:
      state = { ...state, fetching: false, fetched: false, err: action.payload};
      break;
    case CREATE_SCHEDULE_FAILED:
      state = { ...state, fetching: false, fetched: false, err: action.payload};
      break;
    case LOG_OUT:
      state = initialState;
      break;
    default:
      break;
  }
  return state
}
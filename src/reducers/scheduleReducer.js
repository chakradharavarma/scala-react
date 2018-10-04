import {
  INIT_APP,
  FETCHED_SCHEDULES_FAILED,
  FETCHED_SCHEDULES_SUCCESS,
} from '../actions/types';

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
      state = { ...state, fetching: false, fetched: true, data: action.payload.data || []};
      break;
    case FETCHED_SCHEDULES_FAILED:
      state = { ...state, fetching: false, fetched: false};
      break;
    default:
      break;
  }
  return state
}
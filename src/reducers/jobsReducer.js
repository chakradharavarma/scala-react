import {
  INIT_APP,
  LOG_OUT,
  FETCHED_JOBS_SUCCESS,
  FETCHED_JOBS_FAILED
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: []
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true};
      break;
    case FETCHED_JOBS_SUCCESS:
      
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case FETCHED_JOBS_FAILED:
      state = { ...state, fetching: false, fetched: false, error: action.payload};
      break;
    case LOG_OUT:
      state = initialState;
      break;
    default:
      break;
  }
  return state
}
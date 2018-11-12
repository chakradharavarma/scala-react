import {
  FETCH_JOB_PERFORMANCE,
  FETCH_JOB_PERFORMANCE_SUCCESS,
  FETCH_JOB_PERFORMANCE_FAILED,
  LOG_OUT,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  error: undefined,
}

export default function (state=initialState, action) {
  switch(action.type){
    case FETCH_JOB_PERFORMANCE:
      state = { ...state, fetching: true, fetched: false};
      break;
    case FETCH_JOB_PERFORMANCE_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data.data.result || []};
      break;
    case FETCH_JOB_PERFORMANCE_FAILED:
      state = { ...state, data: [], fetched: false, fetching: false, error: action.payload};
      break;
    case LOG_OUT:
      state = initialState;
      break;
    default:
      break;
  }
  return state
}
import {
  INIT_APP,
  LOG_OUT,
  FETCHED_JOBS_SUCCESS,
  FETCHED_JOBS_FAILED,
  FETCHED_JOBS_STATUS_FAILED,
  GET_STD_ERR_SUCCESS,
  GET_STD_ERR_FAILED,
  GET_STD_OUT_SUCCESS,
  GET_STD_OUT_FAILED,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  standardOut: 'No data',
  standardError: 'No data',
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
    /*
    case FETCHED_JOBS_STATUS_SUCCESS:
      state = { ...state, fetching: false, fetched: true};
      break;
    */
    case FETCHED_JOBS_STATUS_FAILED:
      state = { ...state, fetching: false, fetched: false, error: action.payload};
      break;
    case GET_STD_ERR_SUCCESS:
      state = { ...state, standardError: action.payload.data.contents || 'No data'};
      break;
    case GET_STD_ERR_FAILED:
      state = { ...state, standardError: 'No data'};
      break;
    case GET_STD_OUT_SUCCESS:
      state = { ...state, standardOut: action.payload.data.contents || 'No data'};
      break;
    case GET_STD_OUT_FAILED:
      state = { ...state, standardOut: 'No data'};
      break;
    case LOG_OUT:
      state = initialState;
      break;
    default:
      break;
  }
  return state
}
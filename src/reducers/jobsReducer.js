import {
  FETCHED_JOBS_SUCCESS,
  FETCHED_JOBS_FAILED,
  FETCHED_JOBS_STATUS_SUCCESS,
  FETCHED_JOBS_STATUS_FAILED,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  status: {},
  error: null,
}

export default function (state=initialState, action) {
  switch(action.type){
    case "INIT_APP":
      state = { ...state, fetching: true};
      break;
      case FETCHED_JOBS_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case FETCHED_JOBS_FAILED:
      console.log(action.payload);
      state = { ...state, fetching: false, fetched: false, error: action.payload};
      break;
    case FETCHED_JOBS_STATUS_SUCCESS:
      state = { ...state, fetching: false, fetched: true, status: action.payload.data};
      break;
    case FETCHED_JOBS_STATUS_FAILED:
      console.log(action.payload);
      state = { ...state, fetching: false, fetched: false, error: action.payload};
      break;
    default:
      break;
  }
  return state
}
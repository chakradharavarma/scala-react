import {
  FETCHED_WORKFLOW_TEMPLATES_SUCCESS,
  FETCHED_WORKFLOW_TEMPLATES_FAILED,
  INIT_APP,
  LOG_OUT,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  error: null,
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true};
      break;
    case FETCHED_WORKFLOW_TEMPLATES_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case FETCHED_WORKFLOW_TEMPLATES_FAILED:
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
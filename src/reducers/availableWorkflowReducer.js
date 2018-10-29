import {
  DELETE_WORKFLOW,
  DELETE_WORKFLOW_FAILED,
  DELETE_WORKFLOW_SUCCESS,
  FETCHED_WORKFLOWS_AVAILABLE_FAILED,
  FETCHED_WORKFLOWS_AVAILABLE_SUCCESS,  
  INIT_APP,
  LOG_OUT,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
}

export default function (state={...initialState}, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true};
      break;
    case FETCHED_WORKFLOWS_AVAILABLE_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case FETCHED_WORKFLOWS_AVAILABLE_FAILED:
      state = { ...state, fetching: false, fetched: false};
      break;
    case DELETE_WORKFLOW:
      state = { ...state, fetching: false, fetched: false};
      break;
    case DELETE_WORKFLOW_SUCCESS:
      state = { ...state, fetching: false, fetched: false};
      break;
    case DELETE_WORKFLOW_FAILED:
      state = { ...state, fetching: false, fetched: false};
      break;
    case LOG_OUT:
      state = initialState;
      break;
    default:
      break;
  }
  return state
}
import {
  FETCHED_WORKFLOW_TEMPLATES_SUCCESS,
  FETCHED_WORKFLOW_TEMPLATES_FAILED,
  INIT_APP,
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
      console.log(action.payload);
      state = { ...state, fetching: false, fetched: false, error: action.payload};
      break;
    default:
      break;
  }
  return state
}
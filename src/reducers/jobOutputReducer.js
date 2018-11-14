import {
  LOG_OUT,
  GET_STD_ERR_SUCCESS,
  GET_STD_ERR_FAILED,
  GET_STD_OUT_SUCCESS,
  GET_STD_OUT_FAILED,
  GET_STD_OUT,
  GET_STD_ERR,
  SHOW_STANDARD_ERR,
  SHOW_STANDARD_OUT,
  CLOSE_STANDARD_MODAL,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  standardOut: 'No data',
  standardError: 'No data',
  jobId: '',
  open: false,
  type: '',
}

export default function (state=initialState, action) {
  switch(action.type){
    case GET_STD_ERR_SUCCESS:
      state = { ...state, standardError: action.payload.data.contents.replace(/(?:\r\n|\r|\n)/g, '<br>') || 'No data'};
      break;
    case GET_STD_ERR_FAILED:
      state = { ...state, standardError: 'No data'};
      break;
    case GET_STD_OUT_SUCCESS:
      state = { ...state, standardOut: action.payload.data.contents.replace(/(?:\r\n|\r|\n)/g, '<br>') || 'No data'};
      break;
    case GET_STD_OUT:
      state = { ...state, jobId: action.payload.id };
      break;
    case GET_STD_ERR:
      state = { ...state, jobId: action.payload.id };
      break;
    case GET_STD_OUT_FAILED:
      state = { ...state, standardOut: 'No data'};
      break;
    case SHOW_STANDARD_OUT:
      state = { ...state, type: 'out', open: true }
      break;
    case SHOW_STANDARD_ERR:
      state = { ...state, type: 'err', open: true }
      break;
    case CLOSE_STANDARD_MODAL:
      state = { ...state, type: 'err', open: false }
      break;
    case LOG_OUT:
      state = initialState;
      break;
    default:
      break;
  }
  return state
}
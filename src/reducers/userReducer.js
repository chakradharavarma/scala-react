import {
  INIT_APP,
  LOG_OUT,
  LOG_IN_FAILED,
  LOG_OUT_SUCCESS,
  NEEDS_VERIFICATION,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  VERIFY_SUCCESS,
  FETCH_LOCAL_COGNITO_USER_FAILED,
  FETCH_LOCAL_COGNITO_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  data: null,
  verification: {
    verified: false,
    username: false,
  },
  fetching: true,
  fetched: false,
  error: null
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true};
      break;
    case '@@router/LOCATION_CHANGE':
      state = { ...state, error: null }
      break;

    case FETCH_LOCAL_COGNITO_USER_SUCCESS:
      state = { 
        ...state,
        fetching: false,
        fetched: true,
        error: null,
        verification: { username: action.payload.username, verified: true },
        data: action.payload
      }
      break;
    case FETCH_LOCAL_COGNITO_USER_FAILED:
      state = { ...state, fetching: false, fetched: false }
      break;
    case LOG_OUT:
      state = { ...initialState, fetching: false }
      break;
    case LOG_OUT_SUCCESS:
      state = { ...initialState, fetching: false }
      break;
    case LOG_IN_FAILED:
      state = { ...state, fetching: false, error: action.payload}
      break;
    case REGISTER_SUCCESS:
      state = { ...state,
        error: null,
        verification: {
          verified: action.payload.userConfirmed,
          username: action.payload.user.username
        }
      }
      break;
    case REGISTER_FAILED:
      state = { ...state, error: action.payload}
      break;
    case VERIFY_SUCCESS:
      state = { ...initialState, error: null, fetching: false }
      break;
    case NEEDS_VERIFICATION:
      state = {
        ...state,
        verification: {
          verified: false,
          username: action.payload.username
        }
      }
      break;
    default:
      break;
  }
  return state
}
const initialState = {
  fetching: false,
  fetched: false,
  email: null,
  error: null
}

export default function (state={}, action) {
  switch(action.type){
    case "LOG_IN":
      state = { ...state, fetching: true};
      /*
      post('/api/login', action.payload)
        .then(state = { ...state, ...action.payload, fetched: true, fetching: false})
        .then(localStorage.setItem('SERIALIZED_USER', JSON.stringify(state)))
        .catch((error) => state = { ...state, error: error});*/
      state = { ...state, ...action.payload, fetched: true, fetching: false}
      break;
    case "LOG_OUT": 
      localStorage.setItem('USER', null)
      state = initialState;
      break;
    case "FETCH_LOCAL_USER":
      const localUser = JSON.parse(localStorage.getItem('SERIALIZED_USER'));
      state = { ...state, ...localUser }
      break;

    case "FETCH_USER_ERROR": 
      state = { ...state, error: action.payload, fetching: false}
      break;
    case "DESTROY_USER":
      state = { ...state, name: null}
      break;
    default:
      break;
  }
  return state
}
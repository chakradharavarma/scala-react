export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const FETCH_LOCAL_USER = 'FETCH_LOCAL_USER';


export function logIn(user) {
  return { type: LOG_IN, payload: user }
}

export function logOut(user) {
  return { type: LOG_OUT, payload: user }
}

export function fetchLocalUser() {
  return { type: FETCH_LOCAL_USER }
}
import {
    REGISTER_SUCCESS,
    LOG_IN_SUCCESS,
    LOG_OUT,
    FETCH_LOCAL_COGNITO_USER,
} from './types';

export const registerSuccess = (user) => {
    return {
        type: REGISTER_SUCCESS,
        payload: {
            user
        }
    }
}

export const handleRegister = (user) => {
    return {
        type: REGISTER_SUCCESS,
        payload: {
            user
        }
    }
}

export const logInSuccess = (user) => {
    return {
        type: LOG_IN_SUCCESS,
        payload: user
    }
}

export const handleFetchUser = (user) => {
    return {
        type: FETCH_LOCAL_COGNITO_USER,
        payload: {

        }
    }
}

export function logOut(user) {
    return { type: LOG_OUT, payload: user }
}
  
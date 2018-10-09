import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
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

export const handleLogin = (user) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user
        }
    }
}

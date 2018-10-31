import {
    REGISTER,
    VERIFY,
    LOG_IN,
    LOG_OUT,
    RESEND_CODE,
    IMPERSONATE_USER
} from './types';

export const verify = (username, code) => {
    return {
        type: VERIFY,
        payload: {
            username,
            code
        }
    }
}

export const register = (username, password, email) => {
    return {
        type: REGISTER,
        payload: {
            username,
            password,
            email
        }
    }
}

export const logIn = (username, password) => {
    return {
        type: LOG_IN,
        payload: {
            username,
            password
        }
    }
}

export function logOut(user) {
    return {
        type: LOG_OUT, 
        payload: user
    }
}
  
export function resendCode(username) {
    return {
        type: RESEND_CODE,
        payload: {
            username
        }
    }
}

export function verifyChallenge(challenge, username) {
    return {
        type: IMPERSONATE_USER,
        payload: {
            challenge,
            username,
        }
    }
}
import {
    TERMINATE_JOB,
    GET_STD_ERR,
    GET_STD_OUT,
    FETCH_JOB_PERFORMANCE
} from './types';

export const terminateJob = (uuid) => {
    return {
        type: TERMINATE_JOB,
        payload: {
            uuid
        }
    }
}

export const getStandardOut = (id) => {
    return {
        type: GET_STD_OUT,
        payload: {
            id
        }
    }
}

export const getStandardError = (id) => {
    return {
        type: GET_STD_ERR,
        payload: {
            id
        }
    }
}

export const getPerformance = () => {
    return {
        type: FETCH_JOB_PERFORMANCE,
    }
}

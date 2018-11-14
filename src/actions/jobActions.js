import {
    TERMINATE_JOB,
    GET_STD_ERR,
    GET_STD_OUT,
    FETCH_JOBS,
    FETCH_JOB_PERFORMANCE,
    SHOW_STANDARD_ERR,
    SHOW_STANDARD_OUT,
    CLOSE_STANDARD_MODAL,
} from './types';

export const terminateJob = (id) => {
    return {
        type: TERMINATE_JOB,
        payload: {
            id
        }
    }
}

export const getJobs = () => {
    return {
        type: FETCH_JOBS,
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

export const showStandardOut = () => {
    return {
        type: SHOW_STANDARD_OUT,
    }
}

export const showStandardError = () => {
    return {
        type: SHOW_STANDARD_ERR,
    }
}

export const closeStandardModal = () => {
    return {
        type: CLOSE_STANDARD_MODAL,
    }
}
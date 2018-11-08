import {
    CREATE_DESKTOP,
    CREATE_DESKTOP_JOB,
    DELETE_DESKTOP,
    PAUSE_DESKTOP,
    RESUME_DESKTOP,
} from './types';

export const deleteDesktop = (desktop) => {
    return {
        type: DELETE_DESKTOP,
        payload: desktop
    }
}

export const createDesktop = (type) => {
    return {
        type: CREATE_DESKTOP,
        payload: {
            type
        }
    }
}

export const createDesktopJob = (jobid, desktopType) => {
    return {
        type: CREATE_DESKTOP_JOB,
        payload: {
            desktopType,
            jobid
        }
    }
}

export const pauseDesktop = (iid) => {
    return {
        type: PAUSE_DESKTOP,
        payload: {
            iid
        }
    }
}

export const resumeDesktop = (iid) => {
    return {
        type: RESUME_DESKTOP,
        payload: {
            iid
        }
    }
}

import {
    CREATE_DESKTOP,
    DELETE_DESKTOP,
    PAUSE_DESKTOP,
    RESUME_DESKTOP,
} from './types';

export const deleteDesktop = (desktop_id, con_id) => {
    return {
        type: DELETE_DESKTOP,
        payload: {
            desktop_id,
            con_id
        }
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

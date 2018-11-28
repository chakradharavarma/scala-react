import {
    DELETE_WORKFLOW,
    CREATE_WORKFLOW,
    RUN_WORKFLOW,
    EDIT_WORKFLOW,
    CLONE_WORKFLOW,
} from './types';

export const createWorkflow = (payload) => {
    return {
        type: CREATE_WORKFLOW,
        payload
    }
}

export const deleteWorkflow = (id) => {
    return {
        type: DELETE_WORKFLOW,
        payload: {
            id
        }
    }
}

export const cloneWorkflow = (id) => {
    return {
        type: CLONE_WORKFLOW,
        payload: {
            id
        }
    }
}

export const runWorkflow = (id) => {
    return {
        type: RUN_WORKFLOW,
        payload: {
            id
        }
    }
}

export const editWorkflow = (payload) => {
    return {
        type: EDIT_WORKFLOW,
        payload
    }
}

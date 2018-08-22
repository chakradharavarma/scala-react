import {
    DELETE_WORKFLOW,
    SUBMIT_NEW_WORKFLOW,
    RUN_WORKFLOW,
} from './types';


export const submitNewWorkflow = (payload) => {
    return {
        type: SUBMIT_NEW_WORKFLOW,
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

export const runWorkflow = (id) => {
    return {
        type: RUN_WORKFLOW,
        payload: {
            id
        }
    }
}

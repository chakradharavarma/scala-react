import {
    DELETE_SCHEDULE,
    CREATE_SCHEDULE,
    EDIT_SCHEDULE,
} from './types';

export const deleteSchedule = (id) => {
    return {
        type: DELETE_SCHEDULE,
        payload: {
            id,
        }
    }
}

export const createSchedule = (workflowId, cron) => {
    return {
        type: CREATE_SCHEDULE,
        payload: {
            cron,
            workflowId,
        }
    }
}

export const editSchedule = (workflowId, cron, id) => {
    return {
        type: EDIT_SCHEDULE,
        payload: {
            cron,
            workflowId,
            id,
        }
    }
}
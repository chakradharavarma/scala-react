import {
    DELETE_SCHEDULE,
    CREATE_SCHEDULE,
} from './types';

export const deleteSchedule = (id) => {
    return {
        type: DELETE_SCHEDULE,
        payload: {
            id
        }
    }
}

export const createSchedule = (cron, workflowId) => {
    return {
        type: CREATE_SCHEDULE,
        payload: {
            cron,
            workflowId
        }
    }
}
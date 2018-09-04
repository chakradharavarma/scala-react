import {
    TERMINATE_JOB,
} from './types';

export const terminateJob = (uuid) => {
    return {
        type: TERMINATE_JOB,
        payload: {
            uuid
        }
    }
}
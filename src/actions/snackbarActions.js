import {
    CLOSE_SNACKBAR,
    PUSH_MESSAGE,
    PROCESS_QUEUE,
} from './types';

export const processQueue = () => {
    return {
        type: PROCESS_QUEUE,
    }
}

export const closeSnackbar = () => {
    return {
        type: CLOSE_SNACKBAR,
    }
}

export const pushMessage = message => {
    return {
        type: PUSH_MESSAGE,
        payload: {
            message,
            key: new Date().getTime(),
        }
    }
}

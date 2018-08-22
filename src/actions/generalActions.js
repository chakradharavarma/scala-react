import {
    INIT_APP,
    DOWNLOAD_KEY_PAIR,
    CLEAR_MESSAGES
} from './types';

export const initializeApp = () => {
    return {
        type: INIT_APP,
    }
}


export const downloadKeyPair = () => {
    return {
        type: DOWNLOAD_KEY_PAIR,
    }
}

export const clearMessages = () => {
    return {
        type: CLEAR_MESSAGES
    }
}